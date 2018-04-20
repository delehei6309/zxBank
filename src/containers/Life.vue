<template>
    <div class="life" flex="dir:top">

        <div flex="dir:top" flex-box="1" class="life-content">
            <div class="thems" flex="box:mean" @click.stop="insurance">
                <div class="them">
                    <img src="../images/life/remen.png"/>
                    <p>热门活动</p>
                </div>
                <div class="them">
                    <img src="../images/life/liuliang.png"/>
                    <p>话费流量</p>
                </div>
                <div class="them">
                    <img src="../images/life/jiaofei.png"/>
                    <p>生活缴费</p>
                </div>
                <div class="them">
                    <img src="../images/life/dianying.png"/>
                    <p>特惠电影</p>
                </div>

            </div>
            <div class="recommend">
                <div class="title">为你推荐</div>
                <div class="items" flex="box:mean">
                    <div class="item">
                        <p class="item-text">保障全家安全</p>
                        <img class="item-image" src="../images/life/item3.png" alt="">
                    </div>
                    <div class="item">
                        <p class="item-text">借钱就是这么简单</p>
                        <img class="item-image" src="../images/life/item1.png" alt="">
                    </div>
                    <div class="item">
                        <p class="item-text">爱心捐赠</p>
                        <img class="item-image" src="../images/life/item2.png" alt="">
                    </div>

                </div>
            </div>
            <div class="recently">
                <div class="title">最近活动</div>
                <div class="list">
                    <div class="list-item" flex>
                        <div class="cicle" flex-box="0" flex="cross:center main:center">荐</div>
                        <div class="explain" flex-box="1">
                            <h5 class="main-text">推荐好友注册</h5>
                            <p class="sub-text">缴费赢话费</p>
                        </div>
                        <div class="action" flex-box="0" flex="cross:center main:right">立即参与</div>
                    </div>
                    <div class="list-item" flex>
                        <div class="cicle xin" flex-box="0" flex="cross:center main:center">新</div>
                        <div class="explain" flex-box="1">
                            <h5 class="main-text">推荐好友注册</h5>
                            <p class="sub-text">缴费赢话费</p>
                        </div>
                        <div class="action" flex-box="0" flex="cross:center main:right">立即参与</div>
                    </div>
                    <div class="list-item" flex>
                        <div class="cicle li" flex-box="0" flex="cross:center main:center">礼</div>
                        <div class="explain" flex-box="1">
                            <h5 class="main-text">推荐好友注册</h5>
                            <p class="sub-text">缴费赢话费</p>
                        </div>
                        <div class="action" flex-box="0" flex="cross:center main:right">立即参与</div>
                    </div>
                </div>
            </div>
        </div>
        <tabs flex-box="0"></tabs>
    </div>

</template>

<script>
    import Tabs from '../components/Tabs';

    export default {
        name: 'life',
        data() {
            return {}
        },
        created() {
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

        }
    }
</script>

<style scoped>
    .life {
        width: 100%;
        height: 100%;
        .life-content {
            width: 100%;
            overflow-y: auto;
            .thems {
                background: #fff;
                padding: .8rem 0;
                .them {
                    text-align: center;
                    p {
                        color: #333;
                        font-size: .6rem;
                    }
                    img {
                        width: 1.2rem;
                    }
                }
            }
            .recommend, .recently {
                margin-top: .5rem;
                padding: .8rem;
                background: #fff;
                .title {
                    font-size: .7rem;
                    font-weight: 500;
                    color: #333;
                    font-weight: bold;
                    line-height: 1rem;
                }
                .items {
                    .item {
                        position: relative;
                        margin: .5rem .5rem 0;
                        background: #FFFED1;
                        height: 3rem;
                        .item-image {
                            position: absolute;
                            right: 10px;
                            bottom: 4px;
                            width: 2rem;
                            height: 1.5rem;
                        }
                        .item-text {
                            padding-top: .5rem;
                            text-align: center;
                            font-size: .6rem;
                            color: #464646;
                        }
                        &:first-child {
                            background: #BDBCFF;
                            margin-left: 0;
                            margin-right: 0;
                        }
                        &:last-child {
                            background: #FFD3B6;
                            margin-left: 0;
                            margin-right: 0;
                        }
                    }
                }
                .list {
                    .list-item {
                        line-height: 1rem;
                        padding: .7rem .5rem;
                        border-bottom: 1px solid #ddd;
                        &:last-child {
                            border-bottom: none;
                            padding-bottom: 0;
                        }
                        .cicle {
                            width: 1.8rem;
                            height: 1.8rem;
                            border-radius: 50%;
                            color: #fff;
                            font-weight: bold;
                            font-family: hzgb;
                            background-image: linear-gradient(-180deg, #43B5EE 0%, #207ED9 100%);
                            &.xin {
                                background-image: linear-gradient(-180deg, #EE4349 0%, #D92023 100%);
                            }
                            &.li {
                                background-image: linear-gradient(-180deg, #F8D66D 0%, #EDAC3B 100%);
                            }
                        }
                        .explain {
                            margin-left: 1rem;
                            .main-text {
                                line-height: 1.2rem;
                                color: #333;
                            }
                            .sub-text {
                                line-height: .8rem;
                                font-size: .6rem;
                                color: #666;
                            }
                        }
                        .action {
                            color: #D9000C;
                            width: 4rem;

                            cursor: pointer;
                        }
                    }
                }
            }
        }
    }
</style>
