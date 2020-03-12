<template>
    <b-card no-body :class="backgroundClass">
        <b-card-body class="pb-3">
            <b-dropdown class="float-right" variant="transparent p-0" right>
                <template slot="button-content">
                    <i :class="icon"></i>
                </template>
                <b-dropdown-item :to="to" v-if="to">{{dropdown_title}}</b-dropdown-item>
            </b-dropdown>
            <br>
            <h3>{{title}}</h3>
            <p class="font-weight-bold p-0" v-html="content"></p>
        </b-card-body>
    </b-card>
</template>

<script>
    export default {
        name: "CommonWidgets",
        props: {
            icon: {
                type: String,
                default: null
            },
            title: {
                type: String,
                default: null
            },
            to: {
                type: String,
                default: null
            },
            dropdown_title: {
                type: String,
                default: 'Action'
            },
            content: {
                type: String,
                default: ''
            },
            backgroundClass: {
                type: String,
                default: 'bg-primary'
            }
        },
        data() {
            return {
                data: {}
            };
        }
    }
</script>

<style scoped>

</style>
