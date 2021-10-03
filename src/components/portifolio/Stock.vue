<template>

    <v-flex class="pr-3 pb-3" xs12 md6 lg4>
        <v-card class="darken-3 blue white--text">
            <v-card-title class="headline">
                <strong>{{stock.name}} </strong><small> (PREÇO: {{stock.price | currency}}| Qtd: {{stock.quantify}})</small>
            </v-card-title>
        </v-card>
        <v-card>
            <v-container fill-height>
                <v-text-field label="Quantidade" type="number" v-model.number="quantify"
                :error="insufficientQtd || !Number.isInteger(quantify) "/>
                <v-btn class="blue darken-3 white--text" 
                :disabled="quantify <= 0 || !Number.isInteger(quantify) || insufficientQtd" @click="sellStock">{{insufficientQtd ? "Insuficiente":"Vender"}}</v-btn>
            </v-container>
        </v-card>
    </v-flex>
</template>

<script>
import { mapActions } from 'vuex';
export default {
    props: ['stock'],
    data(){
        return{
            quantify: 0
        }
    },
    computed:{
        insufficientQtd(){
            return this.quantify > this.stock.quantify
        }
    },
    methods:{
        ...mapActions({sellStockAction: 'sellStock'}),
        sellStock(){
            const order = {
                stockId: this.stock.id,
                stockPrice: this.stock.price,
                quantify: this.quantify,
            }
            this.sellStockAction(order)
            //this.$store.dispatch('sellStock',order)
            this.quantify= 0          
            
        }
    }
}
</script>

<style>

</style>
