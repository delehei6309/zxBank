<template>
    <div class="financial"  flex="dir:top" :style="{minHeight:innerHeight+'px'}">

        <div flex="dir:top" flex-box="1" class="financial-wrap">
            <div>
                <div class="financial-header">
                    <div class="financial-top" flex="main:justify">
                        <div class="financial-search">
                            <input type="text" v-model="searchVal">
                            <span class="search-btn"></span>
                            <span class="clear-input" @click.stop="searchVal = ''"></span>
                        </div>
                        <div class="financial-service" flex-box="1" flex="cross:center main:center">
                            <span></span>
                        </div>
                    </div>
                    <div class="financial-earnings">
                        <div class="earnings-con">
                            <span class="earnings-count">1800.98</span>
                            <span class="earnings-eye"></span>
                        </div>
                        <div class="earnings-yesterday">昨日收益（元）</div>
                    </div>
                    <div class="header-label" flex="main:justify">
                        <div>财富体检</div>
                        <div flex>
                            <span>算算我的财富健康指数</span>
                            <span class="go-icon"></span>
                        </div>
                    </div>
                </div>
                <div class="financial-content">
                    <div class="ul-lists fina-category" flex="box:mean">
                        <dl v-for="item in financialItems">
                            <dt><img :src="item.iconUrl" ></dt>
                            <dd>{{item.text}}</dd>
                        </dl>
                    </div>
                    <ul class="ul-lists">
                        <li v-for="item in lists" class="ul-item" :class="{'item-other':item.other}">
                            <template v-if="!item.other">
                                <div class="item-title" flex="main:justify">
                                    <h6 v-html="item.title"></h6>
                                    <span class="title-go-icon go-icon"></span>
                                </div>
                                <div class="item-inner" flex="main:justify">
                                    <dl class="item-rate">
                                        <dt>{{item.rate}}</dt>
                                        <dd>{{item.rateText}}</dd>
                                    </dl>
                                    <ul class="item-intro">
                                        <li class="intro-tit">{{item.name}}</li>
                                        <li class="intro-exp">{{item.beginning}}元起投</li>
                                        <li flex>
                                            <span class="span-label">智能存取</span>
                                            <span class="span-label">阶梯利率</span>
                                        </li>
                                    </ul>
                                    <div class="item-buy" >
                                        <div v-if="item.buy">
                                            <button>购买</button>
                                        </div>
                                    </div>
                                </div>
                            </template>
                            <template v-else>
                                <div flex class="div-other">
                                    <div flex="cross:center" class="div-other-left">
                                        <span>
                                            <p class="p-top">闲钱能升值</p>
                                            <p>理财神器</p>
                                        </span>
                                    </div>
                                    <div class="img1">
                                        <img src="../images/zhenxing-financial/img1.png" alt="">
                                    </div>
                                    <div flex="cross:center" class="div-other-right">
                                        <span>
                                            <p class="p-top">定投盈</p>
                                            <p>安全可靠</p>
                                        </span>
                                    </div>
                                    <div class="img2">
                                        <img src="../images/zhenxing-financial/img2.png" alt="">
                                    </div>
                                </div>
                            </template>
                        </li>
                    </ul>
                    
                </div>
            </div>
        </div>
        <tabs flex-box="0"></tabs>
    </div>

</template>

<script>
    import '../less/financial.less';
    import Tabs from '../components/Tabs';
    const financialProduct = require('../images/zhenxing-financial/financial-product.png');
    const intelligentDeposit = require('../images/zhenxing-financial/intelligent-deposit.png');
    const insurance = require('../images/zhenxing-financial/insurance.png');
    const funds = require('../images/zhenxing-financial/funds.png');
    export default {
        name: 'financial',
        data() {
            return {
                innerHeight:568,
                searchVal:'',
                financialItems:[
                    {
                        text:'理财产品',
                        iconUrl:financialProduct
                    },{
                        text:'智能存款',
                        iconUrl:intelligentDeposit
                    },{
                        text:'保险',
                        iconUrl:insurance
                    },{
                        text:'基金',
                        iconUrl:funds
                    }
                ],
                lists:[
                    {
                        title:'存款&nbsp;随存随取',
                        rate:'3.95%',
                        rateText:'年利率',
                        name:'振心存',
                        beginning:100,
                        buy:false
                    },{
                        title:'存款&nbsp;随存随取',
                        rate:'3.95%',
                        rateText:'年利率',
                        name:'振心存',
                        beginning:100,
                        buy:false
                    },{
                        other:true
                    },{
                        title:'存款&nbsp;随存随取',
                        rate:'3.95%',
                        rateText:'年利率',
                        name:'振心存',
                        beginning:100,
                        buy:true
                    }
                ]
            }
        },
        created() {
            this.innerHeight = document.body.clientHeight;
        },
        components: {
            Tabs
        },
        computed: {},
        methods: {},
        destroyed() {

        }
    }
</script>
