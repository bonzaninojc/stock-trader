<template>
    <v-flex class="pr-3 pb-3" xs12 md6 lg4>
        <v-card class="darken-3 green white--text">
            <v-card-title class="headline">
                <strong>{{stock.name}} </strong><small> (PREÇO: {{stock.price | currency}})</small>
            </v-card-title>
        </v-card>
        <v-card>
            <v-container fill-height>
                <v-text-field label="Quantidade" type="number" v-model.number="quantify"
                :error="!Number.isInteger(quantify) || insuffcientFunds"/>
                <v-btn class="green darken-3 white--text" 
                :disabled="quantify <= 0 || !Number.isInteger(quantify) || insuffcientFunds" @click="buyStock">{{insuffcientFunds ? 'Insuficiente':'Comprar'}}</v-btn>
            </v-container>
        </v-card>
    </v-flex>
</template>

<script>
export default {
    props: ['stock'],
    data(){
        return{
            quantify: 0
        }
    },
    computed:{
        funds(){
            return this.$store.getters.funds
        },
        insuffcientFunds(){
            return this.quantify * this.stock.price > this.funds
        }
    },
    methods:{
        buyStock(){
            const order = {
                stockId: this.stock.id,
                stockPrice: this.stock.price,
                quantify: this.quantify,
            }
            this.$store.dispatch('buyStock',order)
            this.quantify= 0          
            
        }
    }
}
</script>

<style>

</style>
