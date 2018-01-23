let markets = [
    {
        marketName: 'bittrex',
        URL: 'https://bittrex.com/api/v1.1/public/getmarketsummaries',
        toBTCURL: false,
        pairURL : '',
        blacklist : [],
        last: function (data, coin_prices, blacklist) { //Where to find the last price of coin in JSON data
            return new Promise(function (res, rej) {
                try {
                    for (let obj of data.result) {
                        if(obj["MarketName"].includes('BTC-')) {
                            let coinName = obj["MarketName"].replace("BTC-", '');
                            if (blacklist.includes(coinName))
                                continue;
                            if (!coin_prices[coinName]) coin_prices[coinName] = {};
                            coin_prices[coinName].bittrex = obj.Last;
                        }
                    }
                    res(coin_prices);
                }
                catch (err) {
                    console.log(err);
                    rej(err);
                }
            })
        },

    },

	{
        marketName: 'binance',
        URL: 'https://api.binance.com/api/v1/ticker/allPrices',
        toBTCURL: false,
        pairURL : '',
        blacklist : [],
        last: function (data, coin_prices, blacklist) { //Where to find the last price of coin in JSON data
            return new Promise(function (res, rej) {
                try {
					//console.log("hi this is the result2:\n" + JSON.stringify(data[0], null, 2));
                    for (let obj of data) {
						//console.log("current coin:\n" + JSON.stringify(obj, null, 2));
                        if(obj["symbol"].includes('BTC')) {
                            let coinName = obj["symbol"].replace("BTC", '');
                            if (blacklist.includes(coinName))
                                continue;
                            if (!coin_prices[coinName]) coin_prices[coinName] = {};
                            coin_prices[coinName].binance = obj["price"];
                        }
                    }
                    res(coin_prices);
                }
                catch (err) {
                    console.log(err);
                    rej(err);
                }
            })
        },
    },
	{
        marketName: 'bitgrail',
        URL: 'https://bitgrail.com/api/v1/markets',
        toBTCURL: false,
        pairURL : '',
        blacklist : ['LSK', 'CFT'],
        last: function (data, coin_prices, blacklist) { //Where to find the last price of coin in JSON data
            return new Promise(function (res, rej) {
                try {
					//console.log("hi this is the result2:\n" + JSON.stringify(data[0], null, 2));
                    for (let obj of data['response']['BTC']) {
                        if(obj["market"].includes('/BTC')) {
                            let coinName = obj["market"].replace("/BTC", '');
                            if (blacklist.includes(coinName))
                                continue;
                            if (!coin_prices[coinName]) coin_prices[coinName] = {};
                            coin_prices[coinName].bitgrail = obj["last"];
                        }
                    }
                    res(coin_prices);
                }
                catch (err) {
                    console.log(err);
                    rej(err);
                }

            })
        },

    },
	
	{
        marketName: 'kucoin',
        URL: 'https://api.kucoin.com/v1/market/open/symbols',
        toBTCURL: false,
        pairURL : '',
        blacklist : ['BCD'],
        last: function (data, coin_prices, blacklist) { //Where to find the last price of coin in JSON data
            return new Promise(function (res, rej) {
                try {
					//console.log("hi this is the result2:\n" + JSON.stringify(data[0], null, 2));
                    for (let obj of data['data']) {
                        if(obj["symbol"].includes('-BTC')) {
                            let coinName = obj["symbol"].replace("-BTC", '');
                            if (blacklist.includes(coinName))
                                continue;
                            if (!coin_prices[coinName]) coin_prices[coinName] = {};
                            coin_prices[coinName].kucoin = obj["lastDealPrice"];
                        }
                    }
                    res(coin_prices);
                }
                catch (err) {
                    console.log(err);
                    rej(err);
                }

            })
        },

    },

    /*{
        marketName: 'poloniex',
        URL: 'https://poloniex.com/public?command=returnTicker',
        toBTCURL: false,
        pairURL : '',
        last: function (data, coin_prices, blacklist) { //Where to find the last price of coin in JSON data
            return new Promise(function (res, rej) {
                try {
                    for (var obj in data) {
                        if(obj.includes('BTC_')&&obj!=="BTC_EMC2") {
                            let coinName = obj.replace("BTC_", '');
                            if (!coin_prices[coinName]) coin_prices[coinName] = {};
                            coin_prices[coinName].poloniex = data[obj].last;
                        }
                    }
                    res(coin_prices);
                }
                catch (err) {
                    console.log(err);
                    rej(err);
                }

            })
        },

    },*/
    
    {
		marketName: 'cryptopia',
		URL: 'https://www.cryptopia.co.nz/api/GetMarkets/BTC', //URL To Fetch API From.
		toBTCURL: false, //URL, if needed for an external bitcoin price api.
        pairURL : '',
		blacklist : ['BTG', 'FUEL', 'PINK'],
        last: function (data, coin_prices, blacklist) { //Get the last price of coins in JSON data
			return new Promise(function (res, rej) {
				try {
					for (let obj of data.Data) {
						if(obj["Label"].includes('/BTC')) {
                            let coinName = obj["Label"].replace("/BTC", '');
                            if (blacklist.includes(coinName))
                                continue;
							if (!coin_prices[coinName]) coin_prices[coinName] = {};
							coin_prices[coinName].cryptopia = obj.LastPrice;
                        }
                    }
                    res(coin_prices);
					
                }
                catch (err) {
                    console.log(err);
                    rej(err);
                }

            })
		},
	}
	
	/*{

        marketName: 'kraken', // kraken has no one size fits all market summery so each pair has to be entered as param in GET - will need to add new coins as they are added to exchange
        URL: 'https://api.kraken.com/0/public/Ticker?pair=DASHXBT,EOSXBT,GNOXBT,ETCXBT,ETHXBT,ICNXBT,LTCXBT,MLNXBT,REPXBT,XDGXBT,XLMXBT,XMRXBT,XRPXBT,ZECXBT', //URL To Fetch API From.
        toBTCURL: false, //URL, if needed for an external bitcoin price api.
        pairURL : '',
        last: function (data, coin_prices, blacklist) { //Get the last price of coins in JSON data
            return new Promise(function (res, rej) {
                try {
                    for (let key in data.result) {
                        let arr = key.match(/DASH|EOS|GNO|ETC|ETH|ICN|LTC|MLN|REP|XDG|XLM|XMR|XRP|ZEC/); // matching real names to weird kraken api coin pairs like "XETCXXBT" etc 
                        let name = key;
                        let matchedName = arr[0];
                        if (matchedName === "XDG") { //kraken calls DOGE "XDG" for whatever reason
                            let matchedName = "DOGE";
                            var coinName = matchedName;
                        } else {
                            var coinName = matchedName;
                        }

                        if (!coin_prices[coinName]) coin_prices[coinName] = {};
                        
                        coin_prices[coinName].kraken = data.result[name].c[0];

                    }
                    res(coin_prices);

                }
                catch (err) {
                    console.log(err);
                    rej(err);
                }

            })
        },
    },*/

];

let marketNames = [];
for(let i = 0; i < markets.length; i++) {
    marketNames.push([[markets[i].marketName], [markets[i].pairURL]]);
}
console.log("Markets:", marketNames);
module.exports = function () {
    this.markets = markets;
    this.marketNames = marketNames;
};
