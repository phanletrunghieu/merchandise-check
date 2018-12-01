package com.vision.block.kotlin.utils

import android.content.Context
import android.content.SharedPreferences
import com.google.gson.Gson
import com.google.gson.reflect.TypeToken
import com.vision.block.kotlin.data.response.ProductResponse

class ProductManagerUtils constructor(var context: Context) {

    companion object : ArgumentSingletonHolder<ProductManagerUtils, Context>(::ProductManagerUtils)

    var sharedPrefsExtraUserInformation: SharedPreferences =
        context.getSharedPreferences(Constant.EXTRA_USER_INFORMATION, Context.MODE_PRIVATE)

    fun fillerProductsForKey(products: ArrayList<ProductResponse>, key: String): ArrayList<ProductResponse> {
        val productsForKey = ArrayList<ProductResponse>()
        if (products.isNotEmpty() && products != null) {
            products.forEach { product ->
                //if (product.name!!.toLowerCase().contains(key.toLowerCase())) productsForKey.add(product)
            }
        }
        return productsForKey
    }

    fun setProducts(productList: ArrayList<ProductResponse>) {
        //if (productList.isEmpty()) productList.add(ProductResponse.createBlankAddressLocation())
        val editor = sharedPrefsExtraUserInformation.edit()
        val gson = Gson()
        val json = gson.toJson(productList)
        editor.putString("Products", json)
        editor.apply()
    }

    fun getProducts(): ArrayList<ProductResponse> {
        val gson = Gson()
        val json = sharedPrefsExtraUserInformation.getString("Products", setProductsDefault())
        val type = object : TypeToken<ArrayList<ProductResponse>>() {}.type
        return gson.fromJson(json, type)
    }

    fun setProductsDefault(): String? {
        val addressLocationDefault = ArrayList<ProductResponse>()
        //addressLocationDefault.add(ProductResponse.createBlankAddressLocation())
        val gsonDefault = Gson()
        return gsonDefault.toJson(addressLocationDefault)
    }
}