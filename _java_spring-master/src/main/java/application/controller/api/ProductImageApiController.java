package application.controller.api;

import application.data.model.Product;
import application.data.model.ProductImage;
import application.data.service.ProductImageService;
import application.data.service.ProductService;
import application.model.api.BaseApiResult;
import application.model.api.DataApiResult;
import application.model.dto.ProductImageDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Random;

@RestController
@RequestMapping(path = "/api/product-image")
public class ProductImageApiController {


    @Autowired
    private ProductImageService productImageService;

    @Autowired
    private ProductService productService;

    @PostMapping(value = "/create")
    public BaseApiResult createProductImage(@RequestBody ProductImageDTO dto) {
        DataApiResult result = new DataApiResult();

        try {
            ProductImage productImage = new ProductImage();
            productImage.setProduct(productService.findOne(dto.getProductId()));
            productImage.setCreatedDate(new Date());
            productImage.setLink(dto.getLink());
            productImageService.addNewProductImage(productImage);
            result.setData(productImage.getId());
            result.setMessage("Save product image successfully: " + productImage.getId());
            result.setSuccess(true);
        } catch (Exception e) {
            result.setSuccess(false);
            result.setMessage(e.getMessage());
        }
        return result;
    }

    @PostMapping("/update/{productImageId}")
    public BaseApiResult updateCategory(@PathVariable int productImageId,
                                        @RequestBody ProductImageDTO dto) {
        BaseApiResult result = new BaseApiResult();

        try {
            ProductImage productImage = productImageService.findOne(productImageId);
            productImage.setLink(dto.getLink());
            productImage.setCreatedDate(new Date());
            productImageService.addNewProductImage(productImage);
            result.setSuccess(true);
            result.setMessage("Update product image successfully");
        } catch (Exception e) {
            result.setSuccess(false);
            result.setMessage(e.getMessage());
        }

        return result;
    }


}

