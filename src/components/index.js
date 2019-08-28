// import Vue from 'vue'
import layoutAside from './home/layout-aside'
import layoutHeader from './home/layout-header'
import BreadCrumb from './common/bread-crumb'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor } from 'vue-quill-editor'
import coverImage from './publish/cover-image'
import selectImage from './publish/select-image'

// elementUI导出的对象 对象里有一个方法install
// Vue.use(elementUI) => 调出其提供的install方法，并且在方法中传入的Vue对象
export default {
  install (Vue) {
    Vue.component('layout-aside', layoutAside)
    Vue.component('layout-header', layoutHeader)
    Vue.component('bread-crumb', BreadCrumb)
    Vue.component('quill-editor', quillEditor)
    Vue.component('cover-image', coverImage)
    Vue.component('select-images', selectImage)
  }
}
