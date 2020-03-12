export default {
    name: 'LeftSideBarMenu',
    data() {
        return {
            items: []
        }
    },
    created() {
        // console.log(this.items)
    },
    methods: {
        getSidebarMenu() {
            return this.items;
        }
    }
}
