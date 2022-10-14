import {createStore} from 'vuex'
import {getStateProp, saveStateProp} from '/src/helpers/localStorageHelper.js'

export default createStore({
    state: {
        coins: getStateProp('coins'),
        api_key: getStateProp('api_key'),
        streamer: null,
        lastSubscriptions: getStateProp('last_subscriptions'),
        search: '',
        pagination: {
            offset: 0
        }
    },
    getters: {
        formattedCoins(state) {
            let res = {
                pagination: {},
                items: []
            }

            for (let key in state.coins) {
                if (
                    state.coins[key] &&
                    key.toLowerCase().indexOf(
                        state.search.toLowerCase()
                    ) !== -1
                )
                    res.items.push(
                        {
                            coin: key,
                            price: state.coins[key],
                        }
                    )
            }
            res.pagination.total = res.items.length
            res.items = res.items.slice(state.pagination.offset, state.pagination.offset + 6)
            res.pagination.shown = res.items.length
            res.pagination.offset = state.pagination.offset
            res.pagination.shown = res.items.length
            res.pagination.prev_btn_visible = (state.pagination.offset > 0 && res.items.length > 0)
            res.pagination.next_btn_visible = res.pagination.total > (state.pagination.offset + res.items.length)
            return res
        }
    },
    mutations: {
        SET_STREAMER(state, streamer) {
            state.streamer = streamer
        },
        SET_COINS(state, coins) {
            state.coins = coins
            saveStateProp('coins', coins)
        },
        SET_LAST_SUBSCRIPTIONS(state, subscriptions) {
            state.lastSubscriptions = subscriptions
            saveStateProp('last_subscriptions', subscriptions)
        },
        SET_API_KEY(state, api_key) {
            state.api_key = api_key
            saveStateProp('api_key', api_key)
        },
        SET_SEARCH(state, search) {
            state.search = search
            state.pagination.offset = 0
        },
        GO_PREV_PAGE(state) {
            if (state.pagination.offset < 6)
                state.pagination.offset = 0
            else
                state.pagination.offset -= 6
        },
        GO_NEXT_PAGE(state) {
            const total = Object.values(state.coins).filter(coin => coin).length
            if (state.pagination.offset > (total - 6 - 1))
                state.pagination.offset = total - 6 - 1
            else
                state.pagination.offset += 6
        },
        CLEAR_PRICES(state) {
            for (var key in state.coins) {
                state.coins[key] = (state.coins[key] && state.coins[key].length > 0) ? [
                    state.coins[key][state.coins[key].length - 1]
                ] : null
            }
        },
        REMOVE_TICKER(state, coin) {
            if (state.coins[coin])
                delete state.coins[coin]
            saveStateProp('coins', state.coins)
        },
    },
    actions: {
        subscribe({commit, state, dispatch}) {
            if (state.coins === null)
                return
            state.streamer.send(
                JSON.stringify(
                    {
                        "action": "SubRemove",
                        "subs": state.lastSubscriptions
                    }
                )
            );
            let subscriptions = Object.keys(state.coins).map(coin => `2~Coinbase~${coin}~USD`)
            commit('SET_LAST_SUBSCRIPTIONS', subscriptions)
            state.streamer.send(
                JSON.stringify(
                    {
                        "action": "SubAdd",
                        "subs": subscriptions
                    }
                )
            )
        },
        initWebSocket({commit, state, dispatch}) {
            if (!state.streamer)
                commit('SET_STREAMER', new WebSocket('wss://streamer.cryptocompare.com/v2?api_key=' + state.api_key))
            state.streamer.onopen = function onStreamOpen() {
                dispatch('subscribe')
            }

            state.streamer.onmessage = function onStreamMessage(message) {
                const data = JSON.parse(message.data)
                console.log(data)
                var coins = state.coins
                if (data.TYPE == 2 && state.coins[data.FROMSYMBOL] !== undefined && data.PRICE) {
                    if (coins[data.FROMSYMBOL] === null)
                        coins[data.FROMSYMBOL] = []
                    coins[data.FROMSYMBOL].push(data.PRICE)
                }
                commit('SET_COINS', coins)
            }
        },
        addTicker({commit, state, dispatch}, coin) {
            var coins = state.coins
            if (coins === null)
                coins = {}
            coins[coin] = null
            commit('SET_COINS', coins)
            dispatch('subscribe')
        },
        setApiKey({commit}, api_key) {
            commit('SET_API_KEY', api_key)
        },
        setSearch({commit}, search) {
            commit('SET_SEARCH', search)
        },
        nextPage({commit}) {
            commit('GO_NEXT_PAGE')
        },
        prevPage({commit}) {
            commit('GO_PREV_PAGE')
        },
        clearPrices({commit}) {
            commit('CLEAR_PRICES')
        },
        removeTicker({commit}, coin) {
            commit('REMOVE_TICKER', coin)
        },
    }
})