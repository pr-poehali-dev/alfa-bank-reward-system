import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

const Index = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    cardNumber: '',
    amount: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch('https://functions.poehali.dev/93a24d13-080c-4c52-96c8-400218957309', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });
      
      const data = await response.json();
      
      if (response.ok) {
        toast.success('Заявка на вывод средств принята! Мы свяжемся с вами в ближайшее время.');
        setFormData({ fullName: '', cardNumber: '', amount: '' });
      } else {
        toast.error(data.error || 'Произошла ошибка при отправке заявки');
      }
    } catch (error) {
      toast.error('Не удалось отправить заявку. Попробуйте позже.');
    }
  };

  const benefits = [
    {
      icon: 'Percent',
      title: 'Кэшбэк до 10%',
      description: 'На все покупки в категориях на выбор'
    },
    {
      icon: 'CreditCard',
      title: 'Без комиссий',
      description: 'Бесплатное обслуживание навсегда'
    },
    {
      icon: 'Shield',
      title: 'Защита покупок',
      description: 'Страхование и возврат средств'
    },
    {
      icon: 'Smartphone',
      title: 'Мобильный банк',
      description: 'Управление картой в приложении'
    }
  ];

  const steps = [
    {
      number: '01',
      title: 'Оформите карту',
      description: 'Перейдите по реферальной ссылке и заполните анкету онлайн'
    },
    {
      number: '02',
      title: 'Получите карту',
      description: 'Карта будет доставлена курьером или получите в отделении'
    },
    {
      number: '03',
      title: 'Активируйте',
      description: 'Совершите первую покупку на любую сумму'
    },
    {
      number: '04',
      title: 'Получите 500₽',
      description: 'Бонус будет зачислен в течение 3-х рабочих дней'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <header className="border-b bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <Icon name="CreditCard" className="text-white" size={24} />
            </div>
            <span className="text-xl font-bold text-primary">Альфа-Бонус</span>
          </div>
          <a href="https://alfa.me/ASQWHN" target="_blank" rel="noopener noreferrer">
            <Button size="lg" className="font-semibold">
              Оформить карту
              <Icon name="ArrowRight" className="ml-2" size={18} />
            </Button>
          </a>
        </div>
      </header>

      <section className="relative overflow-hidden bg-gradient-to-br from-primary via-red-600 to-red-700 text-white py-20 lg:py-32">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE2djEyTDQ4IDI4VjE2SDM2em0tMTIgMHYxMkwzNiAyOFYxNkgyNHoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-50"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Получи 500₽ за оформление карты Альфа-Банка
              </h1>
              <p className="text-xl mb-8 text-white/90">
                Оформи бесплатную дебетовую карту по нашей ссылке и получи гарантированный бонус 500 рублей. 
                Выводи деньги на любую банковскую карту!
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="https://alfa.me/ASQWHN" target="_blank" rel="noopener noreferrer">
                  <Button size="lg" variant="secondary" className="w-full sm:w-auto text-lg px-8 py-6 font-bold hover:scale-105 transition-transform">
                    Получить 500₽
                    <Icon name="Gift" className="ml-2" size={20} />
                  </Button>
                </a>
              </div>
              <div className="mt-8 flex items-center gap-8 text-sm">
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
            <div className="animate-scale-in">
              <img 
                src="https://cdn.poehali.dev/projects/f0f33024-b655-432f-b887-8e2e10579332/files/7a646376-9493-4263-860f-28682af84beb.jpg" 
                alt="Альфа-Банк карта" 
                className="w-full rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      <section id="benefits" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-secondary">Преимущества карты</h2>
            <p className="text-xl text-muted-foreground">Почему выбирают Альфа-Банк</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <Card key={index} className="border-2 hover:border-primary hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardHeader>
                  <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                    <Icon name={benefit.icon as any} className="text-primary" size={28} />
                  </div>
                  <CardTitle className="text-xl">{benefit.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="conditions" className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-secondary">Условия программы</h2>
            <p className="text-xl text-muted-foreground">Всё просто и прозрачно</p>
          </div>
          <div className="max-w-3xl mx-auto">
            <Card className="border-2">
              <CardContent className="p-8 space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                    <Icon name="Check" className="text-white" size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2">Бонус 500 рублей</h3>
                    <p className="text-muted-foreground">Гарантированная выплата после активации карты и первой покупки</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                    <Icon name="Check" className="text-white" size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2">Бесплатное оформление</h3>
                    <p className="text-muted-foreground">Никаких комиссий за выпуск и обслуживание карты</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                    <Icon name="Check" className="text-white" size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2">Вывод без ограничений</h3>
                    <p className="text-muted-foreground">Выводите бонус на любую банковскую карту России</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                    <Icon name="Check" className="text-white" size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2">Быстрая обработка</h3>
                    <p className="text-muted-foreground">Заявки на вывод обрабатываются в течение 1-3 рабочих дней</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section id="how-to-get" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-secondary">Как получить бонус</h2>
            <p className="text-xl text-muted-foreground">4 простых шага до ваших 500 рублей</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-12 left-full w-full h-0.5 bg-gradient-to-r from-primary to-transparent -translate-x-1/2"></div>
                )}
                <div className="text-center">
                  <div className="w-24 h-24 bg-gradient-to-br from-primary to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <span className="text-3xl font-bold text-white">{step.number}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <a href="https://alfa.me/ASQWHN" target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="text-lg px-8 py-6 font-bold">
                Начать сейчас
                <Icon name="Rocket" className="ml-2" size={20} />
              </Button>
            </a>
          </div>
        </div>
      </section>

      <section id="withdrawal" className="py-20 bg-gradient-to-br from-primary/5 to-red-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-secondary">Как вывести деньги</h2>
            <p className="text-xl text-muted-foreground">Заполните форму для вывода бонуса</p>
          </div>
          <Card className="max-w-2xl mx-auto border-2 shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl">Заявка на вывод средств</CardTitle>
              <CardDescription>Укажите данные для перевода бонуса на вашу карту</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="fullName" className="text-base">ФИО</Label>
                  <Input
                    id="fullName"
                    placeholder="Иванов Иван Иванович"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    required
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="cardNumber" className="text-base">Номер карты для вывода</Label>
                  <Input
                    id="cardNumber"
                    placeholder="0000 0000 0000 0000"
                    value={formData.cardNumber}
                    onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                    required
                    maxLength={19}
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="amount" className="text-base">Сумма к выводу (₽)</Label>
                  <Input
                    id="amount"
                    type="number"
                    placeholder="500"
                    value={formData.amount}
                    onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                    required
                    min="100"
                    max="500"
                    className="mt-2"
                  />
                  <p className="text-sm text-muted-foreground mt-2">Минимальная сумма вывода: 100₽</p>
                </div>
                <Button type="submit" size="lg" className="w-full text-lg py-6 font-bold">
                  Отправить заявку
                  <Icon name="Send" className="ml-2" size={20} />
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      <footer className="bg-secondary text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                  <Icon name="CreditCard" className="text-white" size={24} />
                </div>
                <span className="text-xl font-bold">Альфа-Бонус</span>
              </div>
              <p className="text-white/80">Официальная партнерская программа Альфа-Банка</p>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Контакты</h3>
              <div className="space-y-2 text-white/80">
                <p>Поддержка: 24/7</p>
                <p>Email: support@alfabonus.ru</p>
              </div>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Информация</h3>
              <div className="space-y-2 text-white/80">
                <p>Лицензия ЦБ РФ № 1326</p>
                <p>ПАО «Альфа-Банк»</p>
              </div>
            </div>
          </div>
          <div className="border-t border-white/20 pt-8 text-center text-white/60">
            <p>© 2024 Альфа-Бонус. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;