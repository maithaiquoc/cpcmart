<script type="text/javascript" charset="utf-8" src="../lib/dropdown/js/dropdown.js"></script>
<link rel="stylesheet" type="text/css" href="../lib/dropdown/style.css" />
<div id="wrapper">
        <ul id="nav">
            <li><a href="../index.php" target="_blank">Trang chủ</a></li>
            
            <?php if($_SESSION['kt_login_id']!=""){?>
            
            <li><a href="#"> Quản lý gian hàng &darr;</a>
                <ul>
                    <li><a href="admin.php?act=shop">Danh sách shop</a></li>
                    <li><a href="admin.php?act=item_category">Danh mục sản phẩm</a></li>
                    <li><a href="admin.php?act=template">Giao diện</a></li>
                    <li><a href="admin.php?act=advuser">Quảng cáo</a></li>
                    <li><a href="admin.php?act=slideruser">Slider</a></li>
                    <li><a href="admin.php?act=hotrouser">Hỗ trợ</a></li>
 					<li><a href="admin.php?act=videouser">Video</a></li>

                </ul>
            </li>
                
            <li><a href="#"> Quản lý website &darr;</a>
                <ul>
                    <li><a href="admin.php?act=config&id=2">Cấu hình</a>  </li>
                    <li><a href="admin.php?act=slider">Slide ảnh</a> </li> 
                    <li><a href="admin.php?act=jbstin">Thông tin</a> </li> 
                    <li><a href="admin.php?act=hotro">Hỗ trợ</a> </li> 
                    <li><a href="admin.php?act=adv">Quảng cáo</a> </li>
                    <li><a href="#"> Người dùng &darr;</a>
                        <ul>
                            <li><a href="admin.php?act=user">Thành viên</a> </li>
                            <li><a href="admin.php?act=customer">Khách hàng</a></li>
                        </ul>
                    </li>
                </ul>
            </li>

            <li><a href="admin.php?act=service">Dịch vụ</a></li>

            <li><a href="#"> Quản lý sản phẩm &darr;</a>
                <ul>
                    <li><a href="admin.php?act=shop_category">Danh mục sản phẩm</a> </li>
                    <li><a href="admin.php?act=itemuser">Tất cả sản phẩm</a></li>
                    <li><a href="admin.php?act=itemuser_m">Tạo sản phẩm mới</a></li>
                </ul>
            </li>

            <li><a href="#"> Quản lý tin tức &darr;</a>
                <ul>
                    <li><a href="admin.php?act=jbs_news_category">Danh mục tin tức</a> </li>
                    <li><a href="admin.php?act=newuser">Tất cả tin tức</a></li>
                    <li><a href="admin.php?act=newuser_m">Tạo tin tức mới</a></li>
                </ul>
            </li>
            <?php }?>
  
      </ul>
</div>