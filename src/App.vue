<template>
    <div id="app" flex="dir:top">
        <router-view></router-view>

    </div>
</template>

<script>
    export default {
        name: 'app',
        data() {
            return {
                title: '金疙瘩',
                isIndex: true
            }
        },
        methods: {},

        mounted() {

        }
    }
</script>

<style scoped>
    .header {
        height: 44px;
        position: absolute;
        left: 0;
        top: 0;
        z-index: 8;
        text-align: center;
        width: 100%;
        background: #fff;
        font-size: .7rem;
        color: #6E3018;
        box-shadow: 0 2px 1px 0 rgba(0, 0, 0, .2);
        padding: 0 .8rem;
        .span {
            width: 3rem;
            img {
                width: 1rem;
            }
        }
        .h3 {
            font-size: .9rem;
            height: 100%;
        }
    }

    .app-warp {
        height: 100%
    }

    .top44 {
        padding-top: 44px;

    }
</style>
