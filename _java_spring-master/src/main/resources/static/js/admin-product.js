$(document).ready(function() {

    var dataProduct = {};

    //
    function readURL(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            reader.onload = function(e) {
                $('#preview-product-img').attr('src', e.target.result);
            }
            reader.readAsDataURL(input.files[0]);
        }
    }

    //Xử lý sự kiện thay ổi ảnh sản phẩm
    $("#change-product-mainImage").change(function() {
        readURL(this);
        var formData = new FormData();

        //append file của thẻ input vào formData
        formData.append('file', $("#change-product-mainImage")[0].files[0]);

        //gọi api
        axios.post("/api/upload/upload-image", formData).then(function(res){
            if(res.data.success) {
                //set source cho .product-main-image
                $('.product-main-image').attr('src', res.data.link);
            }
        }, function(err){
        });
    });



    //sự kiện thêm mới sp
    $("#new-product").on("click", function () {
        dataProduct = {};
        $('#input-product-name').val("");
        $('#input-product-desc').val("");
        $("#input-product-category").val("");
        $("#input-product-price").val("");
        $('.product-main-image').attr('src', 'https://www.vietnamprintpack.com/images/default.jpg');

    });

    //sk sửa sp
    $(".edit-product").on("click", function () {
        var pdInfo = $(this).data("product");
        console.log(pdInfo);
        axios.get("/api/product/detail/" + pdInfo).then(function(res){
            if(res.data.success) {
                dataProduct.id = res.data.data.id;
                $("#input-product-name").val(res.data.data.name);
                $("#input-product-desc").val(res.data.data.shortDesc);
                $("#input-product-category").val(res.data.data.categoryId);
                $("#input-product-price").val(res.data.data.price);
                if(res.data.data.mainImage != null) {
                    $('.product-main-image').attr('src', res.data.data.mainImage);
                }
            }else {
                console.log("ahihi");
            }
        }, function(err){

        })
    });



    //
    $(".btn-save-product").on("click", function () {
        if($("#input-product-name").val() === "" || $("#input-product-desc").val() === "" || $("#input-product-price").val()==="") {
            swal(
                'Error',
                'You need to fill all values',
                'error'
            );
            return;
        }


        dataProduct.name = $('#input-product-name').val();
        dataProduct.shortDesc = $('#input-product-desc').val();
        dataProduct.categoryId = $("#input-product-category").val();
        dataProduct.mainImage = $('.product-main-image').attr('src');
        dataProduct.price = $("#input-product-price").val();
        NProgress.start();
        var linkPost = "/api/product/create";
        if(dataProduct.id) {
            linkPost = "/api/product/update/" + dataProduct.id;
        }

        axios.post(linkPost, dataProduct).then(function(res){
            NProgress.done();
            if(res.data.success) {
                swal(
                    'Good job!',
                    res.data.message,
                    'success'
                ).then(function() {
                    location.reload();
                });
            } else {
                swal(
                    'Error',
                    res.data.message,
                    'error'
                );
            }
        }, function(err){
            NProgress.done();
            swal(
                'Error',
                'Some error when saving product',
                'error'
            );
        })
    });



});