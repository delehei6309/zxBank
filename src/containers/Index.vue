<template>
    <div class="index" flex="dir:top">
        <div flex-box="1" class="inner-index">
            <div class="banner-wrap" @click.stop="insurance">
                <transition name="slide-fade">
                    <div class="silde-up" v-for="(img,index) in imageList" v-if="index==currentIndex"
                         :key="index">
                        <img :src="img.src"/>
                    </div>
                </transition>
                <ul class="switch-point">
                    <li v-for="li,index in imageList" :class="{'active':index == currentIndex}"></li>
                </ul>
            </div>
            <div class="tab-item" flex="box:mean">
                <div>
                    <p><img src="../images/index/bank-card.png" class="img-icon"/></p>
                    <p>银行卡</p>
                </div>
                <div>
                    <p><img src="../images/index/product-icon.png" class="img-icon"/></p>
                    <p>理财产品</p>
                </div>
                <div>
                    <p><img src="../images/index/carry-over.png" class="img-icon"/></p>
                    <p>转账</p>
                </div>
                <div>
                    <p><img src="../images/index/loan-icon.png" class="img-icon"/></p>
                    <p>贷款</p>
                </div>
                <div>
                    <p><img src="../images/index/more-icon.png" class="img-icon"/></p>
                    <p>更多</p>
                </div>
            </div>
            <div class="item cun-money">
                <div class="title">智能存款</div>
                <div flex class="content">
                    <div flex-box="0">
                        <div class="weight-num">3.95%</div>
                        <div>年利率</div>
                    </div>
                    <div flex-box="1" class="right">
                        <div class="qi-tou"><span class="red">100元</span>起投</div>
                        <div>
                            <span class="tag">智能存取</span>
                            <span class="tag">阶梯利率</span>
                        </div>
                    </div>
                </div>
                <div>
                    <button class="invest-btn">立即投资</button>
                </div>
            </div>
            <div class="new-msg" flex="cross:center">
                <img src="../images/index/msg-icon.png" class="msg-icon"/>最新消息
            </div>
            <div class="item money-choice">
                <div class="title">财富精选</div>
                <div flex="box:mean" class="content">
                    <div class="sub-item">
                        <div class="item-title">富盈5号</div>
                        <div class="weight-rate">4.28%</div>
                        <div>七日年化收益率</div>
                    </div>
                    <div class="sub-item">
                        <div class="item-title">富盈5号</div>
                        <div class="weight-rate">4.28%</div>
                        <div>七日年化收益率</div>
                    </div>
                </div>
            </div>
            <div class="item life-box">
                <div class="title">生活服务</div>
                <div flex class="content">
                    <div class="left-img" flex-box="0">
                        <img src="../images/index/life-img.png"/>
                    </div>
                    <div flex="box:mean" flex-box="1" class="right-img">
                        <div>
                            <div><img src="../images/index/accident-icon.png" class="icon"/></div>
                            <div>意外</div>
                        </div>
                        <div>
                            <div><img src="../images/index/travel-icon.png" class="icon"/></div>
                            <div>旅行</div>
                        </div>
                        <div>
                            <div><img src="../images/index/property-icon.png" class="icon"/></div>
                            <div>财产</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!--tabs-->
        <tabs flex-box="0"></tabs>


    </div>
</template>

<script>
    import Tabs from '../components/Tabs';
    import '../less/index.less';

    const banner_1 = require('../images/index/banner.png');
    const banner_2 = require('../images/index/life-img.png');
    export default {
        name: 'index',
        data() {
            return {
                timer: null,
                currentIndex: 0,
                imageList: [
                    {src: banner_1},
                    {src: banner_2},
                    {src: banner_1},
                    {src: banner_2},
                    {src: banner_1}
                ]
            }
        },
        created() {
            this.timer = setInterval(() => {
                let len = this.imageList.length;
                this.currentIndex = (this.currentIndex + 1) % len;
            }, 4000);
        },
        components: {
            Tabs
        },
        computed: {},
        methods: {
            insurance() {
                this.$router.push('/insurance');
            }
        },
        destroyed() {
            clearInterval(this.timer)
        }
    }
</script>

