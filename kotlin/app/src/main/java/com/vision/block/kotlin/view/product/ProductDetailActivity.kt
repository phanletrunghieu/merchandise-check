package com.vision.block.kotlin.view.product

import android.os.Bundle
import android.support.v7.app.ActionBar
import android.support.v7.app.AppCompatActivity
import android.support.v7.widget.LinearLayoutManager
import android.support.v7.widget.RecyclerView
import android.widget.RatingBar
import com.bumptech.glide.Glide
import com.vision.block.kotlin.R
import com.vision.block.kotlin.data.response.Log
import com.vision.block.kotlin.data.response.ProductResponse
import com.vision.block.kotlin.utils.ToastSnackBar
import com.vision.block.kotlin.view.custom.logs.LogAdapter
import kotlinx.android.synthetic.main.activity_product_detail.*
import java.util.*


class ProductDetailActivity : AppCompatActivity() {

    private lateinit var product: ProductResponse
    private var products = ArrayList<ProductResponse>()
    private var logs = ArrayList<Log>()
    var currentTime = Calendar.getInstance().time

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_product_detail)

        initDataFake()
        initView()
        initLogs()
        initProductData()
        addEvents()
    }

    private fun initProductData() {
        tvProductName.text = products[0].name
        try {
            ivProduct?.let {
                Glide.with(this)
                    .asBitmap()
                    .load(products[0].image)
                    .into(it)
            }
        } catch (e: Exception) {
        }
        tvBranchName.text = "Owner: " + products[0].owner
        tvContent.text = products[0].content
    }

    private fun initLogs() {
        try {
            rvLogs.apply {
                this.layoutManager = LinearLayoutManager(this@ProductDetailActivity) as RecyclerView.LayoutManager?
                this.adapter = LogAdapter(logs)
            }
        } catch (e: Exception) {
        }
    }

    private fun addEvents() {
        ratingBar.onRatingBarChangeListener = RatingBar.OnRatingBarChangeListener { ratingBar, v, b ->
            when (ratingBar.rating.toInt()) {
                1 -> ToastSnackBar.showSnackbar("Very bad", window.decorView.rootView, this@ProductDetailActivity)
                2 -> ToastSnackBar.showSnackbar(
                    "Need some improvement",
                    window.decorView.rootView,
                    this@ProductDetailActivity
                )
                3 -> ToastSnackBar.showSnackbar("Good", window.decorView.rootView, this@ProductDetailActivity)
                4 -> ToastSnackBar.showSnackbar("Great", window.decorView.rootView, this@ProductDetailActivity)
                5 -> ToastSnackBar.showSnackbar("Awesome", window.decorView.rootView, this@ProductDetailActivity)
            }
        }
        tvBack.setOnClickListener {
            finish()
            overridePendingTransition(R.anim.slide_in_left, R.anim.slide_out_right)
        }
    }

    private fun initView() {
        val actionBar: ActionBar? = supportActionBar
        actionBar?.hide()
    }

    private fun initDataFake() {
        logs.add(Log("1", "Phan Lê Trung Hiếu", currentTime, "Trồng cây chuối vào đất", 5))
        logs.add(Log("2", "Phan Lê Trung Hiếu", currentTime, "Tưới cây", 5))
        logs.add(Log("3", "Phan Lê Trung Hiếu", currentTime, "Bón phân", 5))
        logs.add(Log("4", "Phan Lê Trung Hiếu", currentTime, "Thu hoạch", 5))
        logs.add(Log("5", "Phan Lê Trung Hiếu", currentTime, "Bảo quản thuốc trừ sâu", 5))
        logs.add(Log("6", "Phan Lê Trung Hiếu", currentTime, "Ủ ure", 5))
        logs.add(Log("7", "Lê Bảo Hưng", currentTime, "Vẩn chuyển hàng bằng vinfast LUX A2.0", 5))
        logs.add(Log("8", "Lê Bảo Hưng", currentTime, "Giao hàng tới partner Nguyễn Hải", 5))
        logs.add(Log("9", "Nguyễn Hoàn Hải", currentTime, "Bảo quản bằng hóa chất", 5))
        logs.add(Log("10", "Nguyễn Hoàn Hải", currentTime, "Bán tới người dùng cuối", 5))
        product = ProductResponse(
            "1",
            "Banana",
            "https://tul.imgix.net/content/article/banana.jpg?auto=format,compress&w=740&h=486&fit=crop&crop=edges",
            "Lê Hoàng Thiên Ấn",
            "Of all fruits, bananas have the worst reputation. People say they’re too carbohydrate-rich, have too much sugar, or contain too many calories. There’s an entire movement dedicated to making banana-less smoothies because of these worries. But can you still eat them — even if you’re trying to lose weight? Yes and yes. Here’s the truth about what this sweet and creamy fruit will do to — and for — your body.",
            logs
        )

        products.add(
            ProductResponse(
                "1",
                "Apple",
                "https://cdn1.woolworths.media/content/wowproductimages/medium/105919.jpg",
                "Lê Trần",
                "For your convenience, Woolworths has provided information relating to products and nutritional information shown on pack copy. However, as ingredients do change from time to time this is only intended as a guide and you should check before consuming. Woolworths is not always the source of product or nutritional information. Woolworths cannot always ensure the accuracy of product information. If you require specific information to assist in your purchasing decision it is recommended you make further enquiries of the manufacturer (see contact details on the packaging) or contact us on 1300 767 969.",
                logs
            )
        )
        products.add(
            ProductResponse(
                "2",
                "Orange",
                "http://www.rezennia.sg/store/wp-content/uploads/2016/06/orange.jpg",
                "Nguyễn Thanh",
                "Common uses: Orange essential oil has been known to stimulate lymph fluids which may assist in relieving swollen tissue. The oil is also very popular due to its uplifting and refreshing properties.\n" +
                        "irritate sensitive skin. It’s help the lymphatic system moving when congested and helps fight colds and flu as well",
                logs
            )
        )
        products.add(
            ProductResponse(
                "3",
                "Apple",
                "https://cdn1.woolworths.media/content/wowproductimages/medium/105919.jpg",
                "Bùi Thanh Hải",
                "",
                logs
            )
        )
        products.add(
            ProductResponse(
                "4",
                "Bánh gạo richy",
                "http://www.richy.com.vn/Uploads/fav/3%20Goi%20banh-01.jpg?width=420&height=260&mode=crop&quality=90&cache=always",
                "Lê Hoàng Thiên Ấn",
                "Với hơn 18 năm Hoạt động Sản xuất và Xuất Nhập Khẩu, RICHY luôn mang tới cho QUÝ KHÁCH HÀNG\n" +
                        "những sản phẩm tốt nhất, thơm ngon và an toàn cho sức khỏe.\n" +
                        "Hiện nay RICHY có 3 văn phòng tại Hà Nội, Đà Nẵng, Hồ Chí Minh và hơn 100+ NPP, hơn 1000+ CBCNV.\n" +
                        "RICHY có 3 nhà máy sản xuất có dây chuyền khép kín đảm bảo VSATTP với máy móc công nghệ hiện đại nhập khẩu ở các quốc gia phát triển,\n" +
                        "đây cũng là mấu chốt để RICHY cho ra các sản phẩm sánh ngang với các sản phẩm nhập khẩu.\n" +
                        "Cùng với đó, đưa sản phẩm RICHY xuất khẩu tới 30 Quốc gia trên toàn Thế giới.\n",
                logs
            )
        )
        products.add(
            ProductResponse(
                "5",
                "Bánh trung thu kinh đô",
                "https://images.vov.vn/w600/uploaded/cn1vaqlkniw/2016_07_04/banh_trung_thu_qxnq.jpg",
                "Lê Hoàng Thiên Ấn",
                "Những chiếc bánh Trung Thu do Mondelez Kinh Đô sản xuất hướng tới đối tượng là cộng đồng người châu Á sống tại Mỹ, là những cộng đồng có truyền thống lâu đời với Tết Trung Thu, một lễ hội quy mô chỉ đứng sau Tết Nguyên Đán.\n" +
                        "\n" +
                        "Đây là lần đầu tiên Mondelez Kinh Đô Việt Nam xuất khẩu sản phẩm bánh Trung Thu qua thị trường Mỹ thông qua hệ thống phân phối của Mondelēz International, một tập đoàn của Mỹ.\n" +
                        "\n" +
                        "Các sản phẩm được xuất khẩu đợt này gồm: bánh trung thu thập cẩm, bánh trung thu hạt sen, bánh trung thu nhân sầu riêng và bánh trung thu đậu xanh lá dứa.",
                logs
            )
        )
        products.add(
            ProductResponse(
                "6",
                "Đường quảng ngãi",
                "http://www.qns.com.vn/Portals/0/DuongAK50kg.png",
                "Lê Hoàng Thiên Ấn",
                "Tiền thân là Công ty Đường Quảng Ngãi, thuộc Bộ Nông Nghiệp và Phát triển Nông thôn, năm 2005 tiến hành cổ phần hoá thành lập Công ty Cổ Phần Đường Quảng Ngãi và hoạt động từ năm 2006",
                logs
            )
        )
        products.add(
            ProductResponse(
                "7",
                "Apple watch series 4",
                "https://9to5mac.com/wp-content/uploads/sites/6/2018/10/Apple-Watch-Series-4-31.jpeg?quality=82&strip=all&w=1600",
                "Phan Lê Trung Ái",
                "Apple Watch Series 4, likely to be the name of Apple’s next wearable, was first shown in images shared by 9to5Mac. The new hardware features a much larger screen with reduced bezels in the same size watch casing. The larger screen fits a much more dense watch face that can show many more complications.",
                logs
            )
        )
        products.add(
            ProductResponse(
                "8",
                "Macbook pro 2018",
                "https://image.coolblue.nl/422x390/products/1090853",
                "Bùi Thanh Bi",
                "Product description\n" +
                        "No load is too heavy for Apple MacBook Pro 15 inches Touch Bar (2018) MR972N/A Silver. The 8th generation Intel i7 processor of the most powerful MacBook ever has no less than 6 processor cores. Rendering 3D models, adding special effects, adding multiple layers in your audio tracks or encoding video; all your work will be done in moments. Colors come to life on the True Tone Retina display, which has a very natural image thanks to the white balance that automatically adjusts to ambient light. The HiFi speakers have a wide range and a deep bass, so you can mix your tracks or videos on location. The Touch Bar supports you wherever you are, showing you relevant functions whatever it is you're doing. This makes you work even faster.",
                logs
            )
        )
        products.add(
            ProductResponse(
                "9",
                "Sữa tươi vinamilk",
                "https://cdn.concung.com/28882-32855-gtt_large/sua-tuoi-tiet-trung-khong-duong-vinamilk-180ml.jpg",
                "Trần Hoàn Hà",
                "Đặc điểm sản phẩm\n" +
                        "\n" +
                        "Sữa tươi tiệt trùng không đường Vinamilk 180ml bổ sung Vitamin D3 theo chuẩn EFSA Châu Âu giúp hỗ trợ miễn dịch, cho cả gia đình thêm khỏe mạnh để luôn sẵn sàng làm tốt những công việc quan trọng mỗi ngày.",
                logs
            )
        )
        products.add(
            ProductResponse(
                "10",
                "Chocolate snacks",
                "https://www.snacknation.com/wp-content/uploads/2018/03/cookie2-718x581c.jpg",
                "Nguyễn Thị Thanh Nga",
                "You don’t have to deny your cravings for sweets to live a healthy lifestyle. Just commit to changing the way you “do” sweet.\n" +
                        "\n" +
                        "Put down the processed candy, the rich bakery cakes, and the packaged cookies, and start getting your fix of healthy sweet snacks from wholesome foods like fruits, nuts, and dark chocolate.\n" +
                        "\n" +
                        "We’ve put together a list of healthy sweet snacks that also happen to pack a nutritional (and energizing) punch. As you enjoy these robust sweets instead of empty sugar bombs, your body will be trained to crave better-for-you treats with substance instead of just sugar.",
                logs
            )
        )

        products.shuffle()
    }
}
