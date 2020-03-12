<template>
    <div class="animated fadeIn">
        <b-row>
            <b-col sm="6" lg="3" md="3" v-for="(d,dk) in data" :key="dk">
                <common-widget
                    :icon="d.icon" :title="d.title"
                    :content="d.content"
                    :to="d.to"
                    :dropdown_title="d.dropdown_title"
                    :backgroundClass="d.backgroundClass"/>
            </b-col>
        </b-row>
    </div>
</template>

<script>
    import CommonWidget from './../views/widgets/Common'
    import Lang from 'lang.js'

    export default {
        name: 'dashboard',
        components: {
            CommonWidget
        },
        data: function () {
            return {
                the: this,
                data: []
            }
        },
        created() {
            axios.post(this.$store.state.routes['Bornodhoni.Widgets.List'])
                .then(res => {
                    this.data = res.data || {};
                })
                .catch(err => {
                    this.data = {};
                    console.log(err.response);
                });
            window.lang = new Lang(this.$store.state.trans);
        },
        methods: {}
    }
</script>

<style>

</style>
