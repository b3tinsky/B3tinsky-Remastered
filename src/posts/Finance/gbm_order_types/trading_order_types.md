---
title: "Trading Order Types"
date: "2022-07-18"
tags: ["Finance"]
---
### Preface

For a trade to happen, a person has to place an __order to buy__ a security and another person has to place an __order to sell__ a security. Order types are the same whether you're buying stocks, futures, or something else. Traders have several options when placing an order that opens the posiblity for different strategies.

In Mexico we have several options when it comes to investing/trading, but almost everyone considers GBM as the most trustworthy and stable. Im sure that other countries and other platforms offer different types of orders but in this post I'll focus on the ones GBM offers. This post is mainly for my understanding and future reference. This may also be useful for anyone that wants to trade using GBM+.

### Basics
An order must specify if its __entering__ or __exiting__ a trade regardless of its type. Every order can be used to __buy__ or __sell__, but depending on which type was used to enter, the other must be used to exit. This means that if you enter a trade with a buy order, you will exit that trade with a sell order. 
An example of this could be when you __buy__ a stock at $100 and __sell__ it when its value increased to $110.
Another example would be shorting a stock by __selling__ it if you expect its value to drop.

### Market Order (MKT)
Market orders are the __quickest__. They buy or sell at the __current price__. This means that the order will be executed ASAP focusing on the current market price for a share, risking that the current price might change in the meantime. 

__Example:__
You place a market order to buy a share of your favorite stock at $100, but while you were placing your order, Elon Musk tweeted about the company, so a lot of people started buying it at the same time you did, causing an increase in its price. This means that even though you were expecting to buy at the price of $100, now you will have to buy at $105 because of the current price shift.

Market orders are recommended when you are willing to risk the price in favor of speed.

📈 Quickly filled <br/>
📉 Price might change

### Limit Order (LMT)
With Limit Orders you are able to set a specific price. This means that the order will be filled exactly at the price you set (or better). If you place an order to __buy__, it can only be filled if someone is willing to __sell at the price you're looking for or less__. If you place an order to __sell__, it will only be filled if someone else is willing to buy at the price you stated. The risk with limit orders is that they might not get filled at all.

__Example:__
You buy a stock at $100 and wait a year until it increased its value to $150. Now you want to sell it and get your sweet profit. The problem is you get a bit optimistic and a bit greedy, to the point you are certain the price will reach $200 in the near future. You place a limit order to sell at exactly $200 that closes in a week. 5 Days go by and the current price is $190. In the 6th day, the company announces it will now show ads in its platform, plummeting the price to $90. This means that your order never got filled because it did not reach the exact price you set, and now you are at a loss.

📈 No surprises (maybe good ones)<br/>
📉 Might not get filled

### Stop Orders (STP)
Stop orders are like Market Orders in the sense that they get filled at the best available price. The difference is that they work with __triggers__. A trigger is set in the opposite direction of the expected price. The order will only "activate" if the current price surpases your trigger.

__Example:__
The usual price of the stock you want to buy is $100, but due to some mysterious Brandon guy, the price dropped to $50. You want to __"buy the dip"__ because you notice the current price is picking up again, but you feel that it might drop soon. So you place a stop order at $70 because you feel that if it gets to $60, it'll probably get to $100 in no time. The next day it gets to $68. The next day it falls to $30. This means it never reached your trigger, so you didn't lose money. It can also work the other way around (most common), as you want your order to be filled ASAP if the price starts dropping so you lose the least amount of money.

📈 Reduces loss of money (either at buying or selling)<br/>
📉 Might not get filled

### Stop-Limit Orders (STPLMT)
These are the babies between a Stop Order and a Limit Order. The Stop-Limit Orders also work with a __trigger__, but instead of becoming a Market Order, they function as a Limit Order. This means that the order will only be "activated" if the price passes the trigger, but it will only be filled if someone agrees to your price.

__Example:__
You place a Stop-Limit Order to sell with a stop trigger of $100 and a limit price of $100 (same trigger/limit). The price drops to $95. This actives the stop part of your order, but since you established a limit, someone HAS to buy at $100 to fill your order. Days go by and your order is still open because even though the price passed your stop, nobody liked your limit price enough to actually buy.

📈 More control over the price<br/>
📉 More risk of the order not being filled

### Trailing Stop Orders
Stop Orders and Stop-Limit Orders can be set to "activate" in relation to the market price, instead of reaching a specific price. This means that instead of setting specific prices for the order to "activate", you set a "tolerance". This tolerance could be set as a currency amount or percentage.

__Example:__
The current price of a stock is $100. You bought it at $90. You are very interested in protecting your profit. You set a "tolerance" of $5 in your Trailing Stop Order. This means that instead of the order activating when reaching a certain price, it will activate whenever the price drops $5 or 5%.

📈 Control regardless of price<br/>
📉 Incorrect tolerance might bring unwanted activation (or lack of)

### Market-if-Touched Orders (MIT)
Like Limit Orders but when the trigger is touched it becomes a Market Order. This means that you can set a limit price, but when the limit is reached, the order is activated as a Market Order.

__Example:__
The market price is $100. You think thats too expensive, so you set your MIT order with a limit of $80. The market reaches $80, but since MIT orders become Market Orders, you end up buying at the current price, which is $82.

📈 More likely to be filled<br/>
📉 Risk of slippage (different price than expected)


### Reference
<hr>

[__The Balance__ - Trading Order Types](https://www.thebalance.com/trading-order-types-1031050)

[__Investopedia__ - Order Types and Processes](https://www.investopedia.com/trading-order-types-and-processes-4689649)

[__GBM__ - Tipos de Ordenes en Trading](https://media.gbm.com/mercados/tipos-de-ordenes-en-trading/)

[__GBM__ - MPL Activa y MPL Pasiva](https://media.gbm.com/mercados/mpl-activa-y-mpl-pasiva/)
