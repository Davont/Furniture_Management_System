<template>
  <div class="app-container">
    <el-table
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%"
    >
      <el-table-column align="center" label="商品编号" width="80">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="商品图片" width="250" align="center">
        <template slot-scope="scope">
          <img style="height: 120px; width:200px" :src="getImgUrl(scope.row.goods_image)">
        </template>
      </el-table-column>

      <el-table-column width="150px" align="center" label="商品名称">
        <template slot-scope="scope">
          <span>{{ scope.row.goods_name }}</span>
        </template>
      </el-table-column>
      <el-table-column width="150px" align="center" label="商户名称">
        <template slot-scope="scope">
          <span>{{ businessName[scope.row.business_id] }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="商品简介">
        <template slot-scope="scope">
          <span>{{ scope.row.goods_intro }}</span>
        </template>
      </el-table-column>
      <el-table-column width="150px" align="center" label="商品价格">
        <template slot-scope="scope">
          <span>￥ {{ scope.row.goods_price }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="280px">
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="small"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
          >编辑</el-button>
          <el-button
            type="danger"
            size="mini"
            icon="el-icon-edit"
            @click="handleDelete(scope.row)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="getList"
    />
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form
        ref="dataForm"
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
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="updateData()">确认</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { goodsList, updateGoods, deleteGoods } from "@/api/goods";
import { businessList } from "@/api/business";
import Pagination from "@/components/Pagination"; // Secondary package based on el-pagination

export default {
  name: "GoodsList",
  components: { Pagination },
  data() {
    return {
      list: null,
      total: 0,
      businessName: [],
      firstBusinessName: "",
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
      dialogPvVisible: false,
      pvData: [],
      rules: {
        goods_name: [
          { required: true, message: "请输入标题", trigger: "blur" }
        ],
        goods_price: [
          { required: true, message: "请输入商品价格" },
          { type: "number", message: "商品价格必须为数字值" }
        ],
        goods_intro: [
          { required: true, message: "请输入商品介绍", trigger: "blur" }
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
      });
      goodsList().then(response => {
        this.list = response.data;
        this.total = response.data.length;
        this.listLoading = false;
        console.log(this.list);
      });
    },
    findIndex(arr, value) {
      let index = arr.findIndex(v => {
        return v == value;
      });
      return index;
    },
    getImgUrl(imgValue) {
      return "http://localhost:3000/" + imgValue;
    },
    handleUpdate(row) {
      this.temp = Object.assign({}, row); // copy obj
      this.dialogFormVisible = true;
      this.$nextTick(() => {
        this.$refs["dataForm"].clearValidate();
      });
      this.temp.image_uri = [
        {
          name: "image",
          url: this.getImgUrl(this.temp.goods_image)
        }
      ];
      if (!this.imgUrl) {
        this.imgUrl = this.temp.goods_image;
      }
      this.firstBusinessName = this.businessName[this.temp.id];
    },
    handleDelete(row) {
      this.$confirm("此操作将永久删除该条信息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let vm = this;
          let temp = Object.assign({}, row); // copy obj

          deleteGoods({ id: temp.id }).then(response => {
            vm.$message({
              type: "success",
              message: "删除成功!"
            });
            vm.getList();
          });
        })
        .catch(err => {
          this.$message({
            type: "error",
            message: err
          });
        });
    },
    handleRemove(file, fileList) {
      console.log("handleRemove");
      this.imgUrl = "";
    },
    handlePreview(file) {
      console.log("handlePreview");
    },
    imgSuccess(response, file, fileList) {
      console.log("imgSuccess");
      this.imgUrl = response.filename.path;
    },
    updateData() {
      this.$refs["dataForm"].validate(valid => {
        if (valid) {
          const tempData = Object.assign({}, this.temp);
          if (!this.imgUrl) {
            this.$notify({
              title: "失败",
              message: "图片未上传",
              type: "error"
            });
          }
          console.log(tempData);
          if (tempData.id) {
            updateGoods({
              id: tempData.id,
              goods_name: tempData.goods_name,
              goods_image: this.imgUrl,
              goods_price: tempData.goods_price,
              goods_intro: tempData.goods_intro,
              business_id: tempData.business_id
            }).then(response => {
              this.imgUrl = "";
              this.dialogFormVisible = false;
              this.$notify({
                title: "成功",
                message: "更新成功",
                type: "success"
              });
              this.getList();
            });
          }
        }
      });
    }
  }
};
</script>
