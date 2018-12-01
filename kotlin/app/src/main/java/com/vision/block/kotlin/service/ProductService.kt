package com.vision.block.kotlin.service

import android.content.Context
import com.vision.block.kotlin.data.response.ProductResponse
import com.vision.block.kotlin.utils.ArgumentSingletonHolder
import io.reactivex.Single
import retrofit2.Retrofit
import retrofit2.http.GET
import retrofit2.http.Path

interface ProductApi {
    @GET(ApiEndpoint.GET_PRODUCTS)
    fun product(@Path("productId") productId: String): Single<ProductResponse>
}

class ProductService private constructor(context: Context) {
    companion object : ArgumentSingletonHolder<ProductService, Context>(::ProductService)

    private val apiClient: Retrofit =
        ApiService.Factory.getRetrofitBuilder(context).baseUrl(ApiEndpoint.BASE_URL).build()

    private val api: ProductApi = apiClient.create(ProductApi::class.java)

    fun productRequest(productId: String) = api.product(productId)
}