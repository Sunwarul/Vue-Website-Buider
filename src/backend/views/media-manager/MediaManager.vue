<template>
    <div>
        <b-card
            @dragend.prevent=""
            @dragleave.prevent="(e)=>{e.stopPropagation();e.currentTarget.classList.remove('bg-info');}"
            @dragenter.prevent="(e)=>{e.stopPropagation();e.currentTarget.classList.add('bg-info');}"
            @dragover.prevent="(e)=>{e.stopPropagation();e.currentTarget.classList.add('bg-info');}"
            @drop.prevent="(e)=>{e.stopPropagation();e.currentTarget.classList.remove('bg-info');handleFiles(e,$route.params.path);}"
        >
            <template slot="header">
                <b-row>
                    <b-col>
                        {{(!_.isUndefined(title) ? title: null) || ($route.meta?($route.meta.title || $route.meta.name)
                        : $route.name)}}
                    </b-col>
                    <b-col class="text-right">
                        <b-button-group>
                            <b-button @click="folderAdd">
                                <i class="fas fa-folder"> Add</i>
                            </b-button>
                        </b-button-group>
                    </b-col>
                </b-row>
            </template>
            <b-row>
                <b-col md="2" v-for="(item,key) in directory" :key="key">
                    <b-card no-body v-if="item.type==='folder'"
                            @dragend.prevent=""
                            @dragleave.prevent="removeHighlight"
                            @dragenter.prevent="setHighlight"
                            @dragover.prevent="setHighlight"
                            @drop.prevent="(e)=>{removeHighlight(e);handleFiles(e,item.path);}">
                        <b-row style="cursor: pointer;" @click.left.exact="checkItem(item)">
                            <b-col md="3" style="padding-left:30px;padding-top:10px;">
                                <i class="fa-3x fa fa-folder"></i>
                            </b-col>
                            <b-col md="9">
                                <b-card-body>
                                    <b-dropdown class="float-right" style="top:0" size="sm" lazy>
                                        <b-dropdown-item-button @click.prevent.stop="editResource(item)">
                                            <i class="fas fa-edit"></i> Rename
                                        </b-dropdown-item-button>
                                        <b-dropdown-item-button @click.prevent.stop="deleteResource(item)">
                                            <i class="fas fa-trash"></i> Delete
                                        </b-dropdown-item-button>
                                    </b-dropdown>
                                    <b-card-text>
                                        <h5>{{item.pathinfo.basename}}</h5>
                                        <template v-if="!_.isUndefined(item.size)">{{formatByteSize(item.size)}}
                                        </template>
                                    </b-card-text>
                                </b-card-body>
                            </b-col>
                        </b-row>
                    </b-card>
                    <b-card no-body v-else>
                        <b-row style="cursor: pointer;" @click.left.exact="checkItem(item)">
                            <b-col md="4">
                                <b-card-img v-if="is_image(item.pathinfo.extension)" @click.prevent="" :src="item.url" @dragstart="(e)=>{
                                       e.dataTransfer.setData('path',item.path);
                                       e.dataTransfer.setData('basename',item.pathinfo.basename);
                                 }" style="height: 100%"></b-card-img>
                                <template v-else>
                                    <br>
                                    <i class="fa-3x"
                                       style="margin-left:20px"
                                       :class="getIcon(item.pathinfo.extension)">
                                    </i>
                                </template>
                            </b-col>
                            <b-col md="8">
                                <b-card-body class="p-0">
                                    <b-dropdown  class="float-right" size="sm" lazy>
                                        <b-dropdown-item-button @click.prevent.stop="editResource(item)">
                                            <i class="fas fa-edit"></i> Rename
                                        </b-dropdown-item-button>
                                        <b-dropdown-item-button @click.prevent.stop="deleteResource(item)">
                                            <i class="fas fa-trash"></i> Delete
                                        </b-dropdown-item-button>
                                        <b-dropdown-divider></b-dropdown-divider>
                                        <b-dropdown-item-button @click.prevent.stop="downloadWithAxios(item)">
                                            <i class="fas fa-download"></i> Download
                                        </b-dropdown-item-button>
                                    </b-dropdown>
                                    <b-card-text>
                                        <h5>{{item.pathinfo.basename}}</h5>
                                        <template v-if="!_.isUndefined(item.size)">{{formatByteSize(item.size)}}
                                        </template>
                                    </b-card-text>
                                </b-card-body>
                            </b-col>
                        </b-row>
                    </b-card>
                    <!--                    <pre v-html="item"></pre>-->
                </b-col>
            </b-row>
            <!--            <pre v-html="$route.params"></pre>-->
        </b-card>
        <b-modal header-bg-variant="dark" id="fileViewer" title="Modal with Popover" size="xl" ok-only>
            <div class="embed-responsive embed-responsive-16by9">
                <embed :src="emb">
            </div>
        </b-modal>
    </div>
</template>

<script>
    import _ from 'lodash'
    import icons from './icons'
    import O2FD from 'json-form-data'

    export default {
        name: "MediaManager",

        data() {
            return {
                _: null,
                title: 'Media Manager',
                add_modal_title: 'Add / Edit Brand',
                view_modal_title: 'View Brand',
                api_url: this.$store.state.routes['Bornodhoni.Brands.List'],
                trash_url: this.$store.state.routes['Bornodhoni.Brands.Delete'],
                submit_url: this.$store.state.routes['Bornodhoni.Brands.Add'],
                form: {},
                directory: [],
                emb: null,
            }
        },
        created() {
            this._ = _;
            this.getDirectory(this.$route.params.path);
        },
        beforeRouteUpdate(to, from, next) {
            this.getDirectory(to.params.path);
            // console.log(to)
            next();
        },
        methods: {
            checkItem(item) {
                if (item.type === 'file') {
                    this.emb = item.url;
                    this.$bvModal.show('fileViewer');
                } else {
                    this.$router.push({name: this.$route.name, params: {path: item.path ? item.path : '/'}});
                }
            },
            getDirectory(path = null) {
                axios.post(this.$store.state.routes['Bornodhoni.MediaManager.Get'], {
                    path: path
                }).then(res => {
                    // console.log(res.data)
                    this.directory = res.data || [];
                }).catch(err => {
                    this.directory = [];
                    console.log(err.response);
                });
            },
            getIcon(type) {
                return icons[type] ? icons[type] : 'fas fa-file';
            },
            formatByteSize(bytes) {
                if (bytes < 1024) return bytes + " bytes";
                else if (bytes < 1048576) return (bytes / 1024).toFixed(3) + " KiB";
                else if (bytes < 1073741824) return (bytes / 1048576).toFixed(3) + " MiB";
                else return (bytes / 1073741824).toFixed(3) + " GiB";
            },
            is_image(extension) {
                return !!(['jpg', 'png', 'jpeg', 'pjpeg', 'pjp', 'svg',
                    'tif', 'tiff', 'webp', 'apng', 'bmp', 'gif', 'ico', 'cur', 'jfif']
                    .indexOf(extension) > -1);
            },
            setHighlight(e) {
                e.stopPropagation();
                e.currentTarget.classList.add("bg-dark");
            },
            removeHighlight(e) {
                e.stopPropagation();
                e.currentTarget.classList.remove("bg-dark");
            },
            handleFiles(e, path) {
                let fd = null;

                if (e.dataTransfer.getData('path')) {
                    fd = {
                        type: 'move',
                        from_path: e.dataTransfer.getData('path'),
                        basename: e.dataTransfer.getData('basename'),
                        to_path: path + "/" + e.dataTransfer.getData('basename'),
                    };
                    // console.log(fd)
                } else {
                    fd = O2FD({
                        type: 'upload',
                        files: e.dataTransfer.files,
                        path: path
                    });
                }
                axios.post(this.$store.state.routes['Bornodhoni.MediaManager.Post'], fd).then(res => {
                    this.msgBox(res.data);
                    if (res.data.status) {
                        this.getDirectory(this.$route.params.path);
                    }
                }).catch(err => {
                    console.log(err.response);
                    this.msgBox(err.response.data);
                });
            },
            msgBox(data, duration, append) {
                this.$bvToast.toast(data.msg, {
                    title: data.title,
                    variant: data.type,
                    autoHideDelay: duration || 3000,
                    appendToast: append || false
                });
            },
            forceFileDownload(response, item) {
                const url = window.URL.createObjectURL(new Blob([response.data]))
                const link = document.createElement('a')
                link.href = url;
                link.setAttribute('download', item.pathinfo.basename);
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            },
            downloadWithAxios(item) {
                axios({
                    method: 'get',
                    url: item.url,
                    responseType: 'arraybuffer'
                }).then(response => {
                    this.forceFileDownload(response, item)
                }).catch(() => console.log('error occured'))
            },
            deleteResource(item) {
                axios.post(this.$store.state.routes['Bornodhoni.MediaManager.Delete'], {
                    path: item.path,
                    type: item.type
                }).then(res => {
                    console.log(res.data);
                    this.msgBox(res.data);
                    if (res.data.status) {
                        this.getDirectory(this.$route.params.path);
                    }
                }).catch(err => {
                    console.log(err.response);
                    this.msgBox(err.response.data);
                });
            },
            editResource(item) {
                let name = prompt("What is the Name?", item.pathinfo.basename);

                if (name && name.trim() != item.pathinfo.basename) {
                    axios.post(this.$store.state.routes['Bornodhoni.MediaManager.Edit'], {
                        from_path: item.path,
                        to_path: item.pathinfo.dirname + "/" + name,
                    }).then(res => {
                        this.msgBox(res.data);
                        if (res.data.status) {
                            this.getDirectory(this.$route.params.path);
                        }
                    }).catch(err => {
                        console.log(err.response);
                        this.msgBox(err.response.data);
                    });
                }
            },
            folderAdd() {
                let name = (prompt('Folder Name?') || '').trim();
                if (name) {
                    let path = (this.$route.params.path ? this.$route.params.path : '') + "/" + name;
                    axios.post(this.$store.state.routes['Bornodhoni.MediaManager.Create'], {
                        path: path,
                        type: 'directory'
                    }).then(res => {
                        console.log(res.data);
                        this.msgBox(res.data);
                        if (res.data.status) {
                            this.getDirectory(this.$route.params.path);
                        }
                    }).catch(err => {
                        console.log(err.response);
                        this.msgBox(err.response.data);
                    });
                }
            }

        }
    }
</script>

