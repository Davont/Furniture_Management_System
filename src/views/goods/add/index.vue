<template>
  <div class="app-container">
    <el-form
      ref="dataForm"
      v-loading="listLoading"
      :rules="rules"
      :model="temp"
      label-position="left"
      label-width="100px"
      style="width: 400px; margin-left:50px;"
    >
      <el-form-item label="商品名称" prop="goods_name">
        <el-input v-model="temp.goods_name"/>
      </el-form-item>
      <el-form-item label="商品价格" prop="goods_price">
        <el-input type="number" v-model.number="temp.goods_price"/>
      </el-form-item>
      <el-form-item label="商户名称" prop="business_id">
        <el-select v-model="temp.business_id" class="filter-item" placeholder="Please select">
          <el-option
            v-for="item in businessName"
            :value="findIndex(businessName,item)"
            :label="item"
            v-if="item"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="商品简介" prop="goods_intro">
        <el-input
          v-model="temp.goods_intro"
          :autosize="{ minRows: 2, maxRows: 8}"
          type="textarea"
          placeholder="Please input"
        />
      </el-form-item>
      <el-form-item label="图片上传" prop="goods_image">
        <el-upload
          class="upload-demo"
          action="http://localhost:3000/upload"
          name="file"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :on-success="imgSuccess"
          :file-list="temp.image_uri"
          list-type="picture"
        >
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer" style="margin-left:150px;">
      <el-button type="primary" @click="createData()" style="width:150px;">确认</el-button>
    </div>
  </div>
</template>

<script>
import { goodsList, createGoods } from "@/api/goods";
import { businessList } from "@/api/business";
export default {
  data() {
    return {
      list: null,
      total: 0,
      businessName: [],
      imgUrl: "",
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20
      },
      temp: {
        id: undefined,
        image_uri: [],
        goods_price: ""
      },
      dialogFormVisible: false,
      dialogStatus: "",
      textMap: {
        update: "Edit",
        create: "Create"
      },
      business_name: [],
      dialogPvVisible: false,
      pvData: [],
      rules: {
        goods_name: [
          { required: true, message: "请输入标题", trigger: "blur" }
        ],
        id: [{ required: true, message: "请输入商品编号", trigger: "blur" }],
        goods_price: [
          { required: true, message: "请输入商品价格" },
          { type: "number", message: "商品价格必须为数字值" }
        ],
        goods_intro: [
          { required: true, message: "请输入商品介绍", trigger: "blur" }
        ],
        business_id: [
          { required: true, message: "请输入商户名称", trigger: "blur" }
        ]
      },
      downloadLoading: false
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      this.listLoading = true;
      businessList().then(response => {
        let array = response.data;
        array.forEach(element => {
          this.businessName[element.id] = element.business_name;
        });
        console.log(this.businessName);
        this.listLoading = false;
      });
    },
    findIndex(arr, value) {
      let index = arr.findIndex(v => {
        return v == value;
      });
      return index;
    },
    createData() {
      this.$refs["dataForm"].validate(valid => {
        if (valid) {
          const tempData = Object.assign({}, this.temp);
          console.log(tempData);
          if (!this.imgUrl) {
            this.$notify({
              title: "失败",
              message: "图片未上传",
              type: "error"
            });
          }
          createGoods({
            goods_name: tempData.goods_name,
            goods_image: this.imgUrl,
            goods_price: tempData.goods_price,
            goods_intro: tempData.goods_intro,
            business_id: tempData.business_id
          })
            .then(response => {
              console.log(response);
              this.$notify({
                title: "成功",
                message: "创建成功",
                type: "success"
              });
              this.getList();
            })
            .catch(err => {
              console.log(err);
            });
        }
      });
    },
    handleRemove(file, fileList) {
      console.log("handleRemove");
    },
    handlePreview(file) {
      console.log("handlePreview");
    },
    imgSuccess(response, file, fileList) {
      console.log("imgSuccess");
      this.imgUrl = response.filename.path;
    }
  }
};
</script>

<style scoped>
.line {
  text-align: center;
}
</style>

