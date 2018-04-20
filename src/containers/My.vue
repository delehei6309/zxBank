<template>
    <div class="my" flex="dir:top">
        <div flex="dir:top" flex-box="1" class="my-body">
            <div class="header" flex-box="0">
                <div flex="main:justify">
                    <div>
                        <img src="../images/my/avatar.png" alt="" class="avatar">
                        <span class="f6 name">赵女士</span>
                    </div>
                    <img src="../images/my/msg.png" alt="" class="msg">
                </div>
                <div class="info-title">
                    <span class="f6">总资产(元)</span>
                    <img src="../images/my/eye-open.png" alt="" class="eye open">
                </div>
                <div class="money" flex="main:justify cross:center">
                    <img src="../images/my/arrow.png" alt="" class="arrow" style="visibility: hidden;">
                    <span>1,800.98</span>
                    <img src="../images/my/arrow.png" alt="" class="arrow">
                </div>
                <div class="lastday">
                    <span>昨日收益</span>
                    <span>￥4.59</span>
                </div>
            </div>
            <div class="tab-bar mt" flex="box:mean cross:center" flex-box="0">
                <div>
                    <img src="../images/my/bank-card.png" alt="" class="item-img">
                    <p>银行卡</p>
                </div>
                <div>
                    <img src="../images/my/f-prdct.png" alt="" class="item-img">
                    <p>理财产品</p>
                </div>
                <div>
                    <img src="../images/my/tasf.png" alt="" class="item-img">
                    <p>转账</p>
                </div>
                <div>
                    <img src="../images/my/loan.png" alt="" class="item-img">
                    <p>贷款</p>
                </div>
                <div>
                    <img src="../images/my/more.png" alt="" class="item-img">
                    <p>更多</p>
                </div>
            </div>
            <div class="content mt pb" flex-box="0">
                <div class="title" flex="cross:center main:justify">
                    <span>我的存款</span>
                    <div flex="cross:center">
                        <span class="red">100.00</span>
                        <img src="../images/my/arrow-2.png" alt="" class="arrow">
                    </div>
                </div>
                <p class="lastday"><span class="f6">昨天收益</span>
                    <span class="f6 green">+1.7</span>
                </p>
                <div class="asset-btn">立即购买</div>
            </div>
            <div class="content mt" flex-box="0">
                <div class="title" flex="cross:center">
                    我的理财
                </div>
                <div flex="main:justify cross:center" class="item bl">
                    <span class="left">
                        活期
                    </span>
                    <div class="right">
                        <div flex="cross:center main:right">
                            <span class="red">100.00</span>
                            <img src="../images/my/arrow-2.png" alt="" class="arrow">
                        </div>
                        <p class="lastday"><span class="f6">昨天收益</span>
                            <span class="f6 green">+1.7</span>
                        </p>
                    </div>
                </div>
                <div flex="main:justify cross:center" class="item">
                    <span class="left">
                        定期
                    </span>
                    <div class="right">
                        <div flex="cross:center main:right">
                            <span class="red">100.00</span>
                            <img src="../images/my/arrow-2.png" alt="" class="arrow">
                        </div>
                        <p class="lastday"><span class="f6">昨天收益</span>
                            <span class="f6 green">+1.7</span>
                        </p>
                    </div>
                </div>

            </div>
            <div class="content mt pb" flex-box="0">
                <div class="title" flex="main:justify cross:center">
                    <span>家庭资产配置</span>
                    <div flex="corss:center">
                        <span class="sec-title">管理你为家人做的投资</span>
                        <img src="../images/my/arrow-2.png" alt="" class="arrow">
                    </div>
                </div>
            </div>
            <div class="content mt pb" flex-box="0">
                <div class="title" flex="main:justify cross:center">
                    <span>贷款服务</span>
                    <div flex="corss:center">
                        <span class="sec-title">看看你能借多少钱</span>
                        <img src="../images/my/arrow-2.png" alt="" class="arrow">
                    </div>
                </div>
            </div>
            <div class="content mt pb">
                <div class="title" flex="main:justify cross:center">
                    <span>领取你的专属保险服务</span>
                    <img src="../images/my/arrow-2.png" alt="" class="arrow">
                </div>
                <div flex="box:mean" class="insurence-box">
                    <div flex="cross:center main:center">
                        <img src="../images/my/car.png" alt="" class="insurence">
                        <span>汽车保险</span>
                    </div>
                    <div flex="cross:center main:center">
                        <img src="../images/my/isurc.png" alt="" class="insurence">
                        <span>健康保险</span>
                    </div>
                </div>
            </div>
        </div>
        <tabs flex-box="0"></tabs>
    </div>

</template>

<script>
    import Tabs from '../components/Tabs';
    import '../less/my.less';

    export default {
        name: 'financial',
        data() {
            return {}
        },
        created() {
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


<style scoped>
    .my {
        width: 100%;
        height: 100%;
    }
</style>
