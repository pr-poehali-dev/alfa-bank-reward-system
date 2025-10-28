import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

const Index = () => {
  const [withdrawalType, setWithdrawalType] = useState<'card' | 'sbp'>('card');
  const [formData, setFormData] = useState({
    fullName: '',
    cardNumber: '',
    phoneNumber: '',
    bankName: '',
    amount: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const dataToSend = withdrawalType === 'card' 
        ? { fullName: formData.fullName, cardNumber: formData.cardNumber, amount: formData.amount }
        : { fullName: formData.fullName, phoneNumber: formData.phoneNumber, bankName: formData.bankName, amount: formData.amount };

      const response = await fetch('https://functions.poehali.dev/93a24d13-080c-4c52-96c8-400218957309', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend)
      });
      
      const data = await response.json();
      
      if (response.ok) {
        toast.success('Заявка на вывод принята! Средства поступят в течение 24 часов.');
        setFormData({ fullName: '', cardNumber: '', phoneNumber: '', bankName: '', amount: '' });
      } else {
        toast.error(data.error || 'Произошла ошибка при отправке заявки');
      }
    } catch (error) {
      toast.error('Не удалось отправить заявку. Попробуйте позже.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b bg-white">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <Icon name="CreditCard" className="text-white" size={24} />
            </div>
            <span className="text-xl font-bold text-primary">Альфа-Бонус</span>
          </div>
          <a href="https://alfa.me/ASQWHN" target="_blank" rel="noopener noreferrer">
            <Button size="lg">
              Оформить карту
              <Icon name="ArrowRight" className="ml-2" size={18} />
            </Button>
          </a>
        </div>
      </header>

      <section className="bg-primary text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Получи 500₽ за оформление карты
          </h1>
          <p className="text-xl mb-8 text-white/90">
            Оформи карту Альфа-Банка по нашей ссылке и получи бонус 500 рублей
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="https://alfa.me/ASQWHN" target="_blank" rel="noopener noreferrer">
              <Button size="lg" variant="secondary" className="text-lg px-8 py-6 font-bold">
                Оформить карту
                <Icon name="Gift" className="ml-2" size={20} />
              </Button>
            </a>
            <a href="https://alfa.me/ASQWHN" target="_blank" rel="noopener noreferrer">
              <Button size="lg" variant="outline" className="text-lg px-8 py-6 font-bold bg-white text-primary hover:bg-gray-100">
                Подробнее
                <Icon name="Info" className="ml-2" size={20} />
              </Button>
            </a>
          </div>
          <div className="mt-12 flex items-center gap-8 justify-center text-sm">
            <div>
              <div className="text-3xl font-bold">2,547</div>
              <div className="text-white/80">Карт оформлено</div>
            </div>
            <div className="h-12 w-px bg-white/30"></div>
            <div>
              <div className="text-3xl font-bold">1,273,500₽</div>
              <div className="text-white/80">Бонусов выплачено</div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Как получить бонус</h2>
          <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            <Card>
              <CardHeader>
                <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center text-xl font-bold mb-2">1</div>
                <CardTitle>Оформи карту</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Перейди по реферальной ссылке</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center text-xl font-bold mb-2">2</div>
                <CardTitle>Получи карту</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Доставка курьером бесплатно</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center text-xl font-bold mb-2">3</div>
                <CardTitle>Активируй</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Соверши первую покупку</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center text-xl font-bold mb-2">4</div>
                <CardTitle>Получи 500₽</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Бонус придет через 3 дня</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section id="withdraw" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl text-center">Вывод средств</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs value={withdrawalType} onValueChange={(v) => setWithdrawalType(v as 'card' | 'sbp')}>
                  <TabsList className="grid w-full grid-cols-2 mb-6">
                    <TabsTrigger value="card">
                      <Icon name="CreditCard" className="mr-2" size={18} />
                      На карту
                    </TabsTrigger>
                    <TabsTrigger value="sbp">
                      <Icon name="Smartphone" className="mr-2" size={18} />
                      СБП (по номеру)
                    </TabsTrigger>
                  </TabsList>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="fullName">ФИО</Label>
                      <Input
                        id="fullName"
                        placeholder="Иванов Иван Иванович"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        required
                      />
                    </div>

                    <TabsContent value="card" className="mt-0 space-y-4">
                      <div>
                        <Label htmlFor="cardNumber">Номер карты</Label>
                        <Input
                          id="cardNumber"
                          placeholder="1234 5678 9012 3456"
                          value={formData.cardNumber}
                          onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                          required={withdrawalType === 'card'}
                        />
                        <p className="text-xs text-muted-foreground mt-1">Перевод в любой банк России</p>
                      </div>
                    </TabsContent>

                    <TabsContent value="sbp" className="mt-0 space-y-4">
                      <div>
                        <Label htmlFor="phoneNumber">Номер телефона</Label>
                        <Input
                          id="phoneNumber"
                          placeholder="+7 (900) 123-45-67"
                          value={formData.phoneNumber}
                          onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                          required={withdrawalType === 'sbp'}
                        />
                        <p className="text-xs text-muted-foreground mt-1">Номер телефона, привязанный к банку</p>
                      </div>
                      <div>
                        <Label htmlFor="bankName">Банк получателя</Label>
                        <Input
                          id="bankName"
                          placeholder="Например: Сбербанк, Тинькофф, ВТБ"
                          value={formData.bankName}
                          onChange={(e) => setFormData({ ...formData, bankName: e.target.value })}
                          required={withdrawalType === 'sbp'}
                        />
                        <p className="text-xs text-muted-foreground mt-1">Укажите название банка для перевода через СБП</p>
                      </div>
                    </TabsContent>

                    <div>
                      <Label htmlFor="amount">Сумма вывода (₽)</Label>
                      <Input
                        id="amount"
                        type="number"
                        placeholder="500"
                        value={formData.amount}
                        onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                        required
                        min="500"
                      />
                      <p className="text-xs text-muted-foreground mt-1">Минимальная сумма: 500₽</p>
                    </div>

                    <Button type="submit" className="w-full" size="lg">
                      Вывести средства
                      <Icon name="Send" className="ml-2" size={18} />
                    </Button>
                  </form>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <a 
        href="https://t.me/your_support_username" 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 w-16 h-16 bg-[#0088cc] hover:bg-[#006699] text-white rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-110 z-50"
        aria-label="Написать в Telegram"
      >
        <Icon name="Send" size={28} />
      </a>

      <footer className="bg-white border-t py-8">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>© 2024 Альфа-Бонус. Реферальная программа Альфа-Банка</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;