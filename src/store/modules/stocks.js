import data from '../../data/stocks'

export default{
    state:{
        stocks: [],
    },
    mutations:{
        setStocks(state,payload){
            state.stocks = payload
        },
        randomStocks(state){
            state.stocks.forEach(stock =>{
                stock.price = Math.round(stock.price * (1 + Math.random() - 0.45))
            })
        }
    },
    actions:{
        buyStock({commit}, order){
            commit('buyStock',order)
        },
        initStocks({commit}){
            commit('setStocks',data)
        },
        randomStocks({commit}){
            commit('randomStocks')
        }
    },
    getters:{
        stocks(state){
            return state.stocks
        }
    }
}