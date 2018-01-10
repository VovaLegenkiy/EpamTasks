Task3
В банке клиентам выдают кредиты двух типов. Стандартные и кредитные линии. Для
каждого кредита известно: № договора, ФИО клиента, срок действия. Для обычного
кредита определен размер ежемесячных выплат и штраф за просроченный платеж (%
от непогашенной суммы в день). Для кредитной линии задается размер ежедневной
ставки по кредиту, которая каждый месяц добавляется к сумме кредита. Для каждого
кредита ведется учет погашения кредита в виде дата платежа, размер платежа. Для
кредитной линии также задается история использования заемных средств, в виде дата
размер взятых заемных средств.
Для заданного месяца рассчитать, для обычного кредита сумму платежа для
погашения кредита для заданного месяца с учетом штрафов и недоплат за
предыдущий месяц. Для кредитной линии рассчитать сумму платежей по процентам.
Например, обычный кредит с 1.01.2017 по 31.03.2017 , сумма платежа в месяц 100 грн.
Штраф 10% в день.
погашение 20.01.2017 70 грн. 20.02.2017 120 грн. То на 1.03.2017 сумма платежа
составит
Сумма за февраль 100 +30 -120 = 10 грн
3 грн в день за просроченный платеж с 1.02.2017 по 19.02.2017 54 грн
итого 64 грн.
Для кредитной линии:
Размер ставки 0.05%
Использование кредита
1.01.2017 100 грн
21.02.2017 100 грн
Погашение
10.01.2017 50 грн
25.02.2017 50 грн
Размер выплат на 1.03.2017 составит:
Проценты по кредиту январь:
1.01 -10.01. 9*100 * 0.05/100
10.01- 31.01 21*50* 0.05/100
Итого на 1.02.2017 тело кредита 50.975
Проценты по кредиту февраль:

1.02-21.02 20*50.975* 0.05/100
21.02-25.02 4*150.975* 0.05/100
25.02-28.02 3*100.975* 0.05/100
Итого 0.9631625. Если 1.03.2017 они не будут оплачены, то добавятся к телу кредита.