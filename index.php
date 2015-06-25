<?php
error_reporting(0);

require("config.php");
require("common_start.php");
include("lib/func.lib.php");

$cache = get_field('tbl_config','id','2','cache');
if($cache == 1){
    $link = $_SERVER['REQUEST_URI'];
    $myLink = explode("?", $link);
    $myData = explode("&", $myLink[1]);
    $myFilter = explode("=", $myData[0]);
    $filterCache = $myFilter[1];
    $myPage = explode("=", $myData[1]);
    $pageNumCache = $myPage[1];

    /* Assign your dynamically generated page to $page */
    $pageName = $_GET['tensanpham'];
    $page = $pageName.".html";

    if($filterCache != ''){
        $page .= "?filter1=".$filterCache."&page=".$pageNumCache;
    }

    if($pageName == ''){
        $pageName = $_GET['tenthongtin'];
        $page = "thong-tin-".$pageName.".html";
    }

    /* Define path and name of cached file */
    $cachefile = 'cache/' .$page;

    /* How long to keep cache file? */
    $cachetime = 18000;

    /* Is cache file still fresh? If so, serve it */
    if($pageName != ''){
        if (file_exists($cachefile) && time() - $cachetime < filemtime($cachefile)) {
            include($cachefile);
            exit;
        }
    }

    /* If no file or too old, render and capture HTML page. */
    ob_start();
}
?>

<?php
if($frame!="login" && $frame!="register" && $frame!="changepass" && $frame!="changeinfo"){
    unset($_SESSION['back_raovat']);
}

require("module/box_device.php");
?>
<!doctype html>
<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="viewport" content="width=device-width,initial-scale=1.0">
    <?php include("module/title.php") ;?>
    <meta name="robots" content="index, follow"/>
    <meta name="author" content="www.cbuilk.com"/>
    <meta content="vi-VN" itemprop="inLanguage" />
    <link rel="shortcut icon" href="imgs/layout/logo.ico" type="image/x-icon" />
    <link rel="stylesheet" type="text/css" href="<?php echo $linkrootshop?>/templates/css.css">
    <script type="text/javascript" src="<?php echo $linkrootshop?>/scripts/jquery.js"></script>
    <link rel="stylesheet" type="text/css" href="<?php echo $linkrootshop?>/scripts/bxslider/jquery.bxslider.css" media="screen and (min-width: 991px)">
    <script type="text/javascript" src="<?php echo $linkrootshop?>/scripts/bxslider/jquery.bxslider.js"></script>
    <script type="text/javascript" src="<?php echo $linkrootshop?>/scripts/scrolltopcontrol.js"></script>

    <!--[if lt IE 9]>
    <script type="text/javascript" src="<?php echo $linkrootshop?>/scripts/css3-mediaqueries.js"></script>
    <script type="text/javascript" src="<?php echo $linkrootshop?>/scripts/html5.js"></script>
    <link rel="stylesheet" type="text/css" href="<?php echo $linkrootshop?>/templates/FIX_IE.css" />
    <script type="text/javascript" src="<?php echo $linkrootshop?>/scripts/selectivizr-min.js"></script>
    <![endif]-->

    <link href="<?php echo $linkrootshop?>/templates/css1.css" rel="stylesheet" />
    <link href="<?php echo $linkrootshop?>/templates/hover.css" rel="stylesheet" />

    <link href="<?php echo $linkrootshop?>/font-awesome-4.1.0/css/font-awesome.min.css" rel="stylesheet" />
    <link rel="stylesheet" type="text/css" href="<?php echo $linkrootshop?>/jquery.bxslider/jquery.bxslider.css" media="screen and (min-width: 991px)">
    <script type="text/javascript" src="<?php echo $linkrootshop?>/jquery.bxslider/jquery.bxslider.min.js"></script>
    <script type="text/javascript" src="<?php echo $linkrootshop?>/jquery.bxslider/plugins/jquery.easing.1.3.js"></script>
    <script type="text/javascript" src="<?php echo $linkrootshop?>/jquery.bxslider/plugins/jquery.fitvids.js"></script>
    <script type="text/javascript"  src="<?php echo $linkrootshop?>/scripts/responsive.js"></script>

    <link rel="stylesheet" href="<?php echo $linkrootshop?>/lib/SlickNav/slicknav.css" media="screen and (max-width: 991px)"/>
    <script src="<?php echo $linkrootshop?>/lib/SlickNav/jquery.slicknav.js"></script>
</head>
<body>
<div id="closed"></div>
<header class="menu">
    <div class="m-wrap">
        <?php include("module/box_logo.php") ;?>
        <?php include("module/box_search.php") ;?>
        <?php include("module/box_tool_ad.php") ;?>
    </div><!-- End .m-wrap -->
</header>

<div class="m-wrap menu-wrap">
    <section class="tool-ct">
        <?php include("module/box_support.php") ;?>
        <?php include("module/info_user.php") ;?>
    </section><!-- End .tool-ct -->
</div><!-- End .m-wrap -->

<?php if($frame==""){ ?>
<div class="m-wrap">
    <?php include("module/menu_left_home.php") ;?>
</div>
<header class="m-slider">
    <div id="slider">
        <?php
        $gt=get_records("tbl_slider","status=0 AND idshop=0","sort","0,20"," ");
        $index = 0;
        while($row_slide=mysql_fetch_assoc($gt)){
            ?>
            <a id="aSlider<?php echo $index ?>" target="_blank" href="<?php echo $row_slide['link']; ?>" style="background-color: <?php echo $row_slide['color']?>"><img src="<?php echo $linkroot ;?>/<?php echo $row_slide['image']?>" alt="" /></a>
        <?php $index++; } ?>
    </div>
</header>
<script>
    $(function() {
        $('#slider').nivoSlider({
            effect: 'random',
            controlNav: false,
            directionNav: false,
            control: false,
            afterChange: function(){
                var totalSlides = $('#slider a img').length;
                var currentSlide = $('#slider').data('nivo:vars').currentSlide;
                $('.m-slider').css("background-color", $("#aSlider"+currentSlide).css('background-color'));
            }
        });
        $('.m-slider').css("background-color", $("#aSlider"+0).css('background-color'));
    });
</script>
<?php } ?>

<div class="clear"></div>

<section id="container" <?php if($frame == ''){echo 'class="fix_main"';} ?>>
    <div class="m-wrap">
        <?php include("module/processFrame.php");?>
    </div><!-- End .m-wrap -->
</section><!-- End #container -->

<div class="mini-bar">
    <div class="mini-shopping">
        <a href="#" onclick="alert('Chức năng hiện đang được hoàn thiện...');">
            <p><i class="fa fa-shopping-cart fa-lg"></i></p>
            <p>Giỏ hàng</p>
        </a>
    </div>
</div>

<link rel="stylesheet" type="text/css" href="<?php echo $linkrootshop?>/scripts/nivo-slider/nivo-slider.css" media="screen and (min-width: 991px)">
<link rel="stylesheet" type="text/css" href="<?php echo $linkrootshop?>/scripts/nivo-slider/themes/default/default.css" media="screen and (min-width: 991px)">
<script type="text/javascript" src="<?php echo $linkrootshop?>/scripts/nivo-slider/jquery.nivo.slider.js"></script>

<?php include("module/footer.php") ;?>
<?php require("common_end.php");?>
</body>
</html>

<?php
if($cache == 1){
    /* Save the cached content to a file */
    if($pageName != ''){
        $fp = fopen($cachefile, 'w');
        fwrite($fp, ob_get_contents());
        fclose($fp);
    }

    /* Send browser output */
    ob_end_flush();
}
?>