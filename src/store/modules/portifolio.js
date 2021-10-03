export default{
    state:{
        funds: 10000,
        stocks: [],
    },
    mutations:{
        buyStock(state,{stockId,stockPrice,quantify}){
            const record = state.stocks.find(element => element.id == stockId)
            if(record){
                record.quantify+= quantify;
            }else{
                state.stocks.push({
                    id: stockId,
                    quantify: quantify
                })
            }
            state.funds -= quantify * stockPrice
        },

        sellStock(state, {stockId,stockPrice,quantify}){
            const record = state.stocks.find(element => element.id == stockId)

            if(record.quantify > quantify){
                record.quantify -= quantify
            }else{
                state.stocks.splice(state.stocks.indexOf(record),1)
            }

            state.funds += quantify * stockPrice
        },

        setPortifolio(state,portifolio){
            state.funds = portifolio.funds
            state.stocks = portifolio.stockPortifolio ? portifolio.stockPortifolio:[] 
        }
    },
    actions:{
        sellStock({commit}, order){
            commit('sellStock',order)
        }
    },
    getters:{
        stockPortifolio(state,getters){
            return state.stocks.map(stock => {
                const record = getters.stocks.find(element => element.id == stock.id)
               
                return {
                    id: stock.id,
                    quantify: stock.quantify,
                    name: record.name,
                    price: record.price
                }
            })
        },
        funds(state){
            return state.funds
        }
    }
}