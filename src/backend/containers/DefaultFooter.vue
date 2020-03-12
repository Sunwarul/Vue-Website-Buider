<template>
    <TheFooter>
        <div>
            <!--footer-->
<!--            <a href="https://bornodhoni.com/projects/bdcms">Bornodhoni CMS</a>-->
            <span class="ml-1" v-html="$store.state.settings.site_copyright || 'Bornodhoni IT'"></span>
        </div>
        <div class="ml-auto">
            <span class="mr-1">Powered by</span>
            <a href="https://bornodhoni.com">Bornodhoni IT</a>
        </div>
    </TheFooter>
</template>
<script>
    import {Footer as TheFooter} from '@coreui/vue'

    export default {
        name: 'DefaultFooter',
        components: {
            TheFooter
        },
    }
</script>
