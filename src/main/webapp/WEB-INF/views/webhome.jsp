<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<?xml version='1.0' encoding='UTF-8' ?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
  <head>
    <title>Ensar - Elektronik aNSiklopedi ARama sistemi</title>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link type="text/css" rel="stylesheet" href="${pageContext.request.contextPath}/stylesheets/bootstrap.min.css" />
    <link type="text/css" rel="stylesheet" href="${pageContext.request.contextPath}/stylesheets/ensar.css" />
    <link type="image/png" rel="shortcut icon" href="img/favicon.png" />
  
    <!-- HTML5 shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!--[if lt IE 9]>
    <script type="text/javascript" src="${pageContext.request.contextPath}/javascripts/html5shiv.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/javascripts/respond.js"></script>
    <![endif]-->

    <script src="${pageContext.request.contextPath}/javascripts/jquery-1.10.2.min.js"></script>
    <script src="${pageContext.request.contextPath}/javascripts/bootstrap.min.js"></script>
    <script src="${pageContext.request.contextPath}/javascripts/ensar.js"></script>
  </head>
  <body>
    <div class="navbar navbar-inverse navbar-fixed-top" role="navigation">
      <div class="container">
        <a class="navbar-brand" style="color: #269abc;" href="${pageContext.request.contextPath}">Ensar</a>
        <ul class="nav navbar-nav">
          <c:choose>
            <c:when test="${param['q'] != null}">
              <li class="active"><a href="${pageContext.request.contextPath}/websearch?q=${param['q']}">Web</a></li>
            </c:when>
            <c:otherwise>
              <li class="active"><a href="${pageContext.request.contextPath}/webhome">Web</a></li>
            </c:otherwise>
          </c:choose>
        </ul>        
      </div>
    </div>
   
    <div id="damla-webhome-container" class="container">
      <div class="row">
        <div id="damla-webhome-title" class="col-xs-6 col-xs-offset-3 text-center">ensar</div>
      </div>
      <div class="row">
        <form class="form-inline" role="form" action="${pageContext.request.contextPath}/websearch">
          <div class="form-group col-xs-6 col-xs-offset-3">
            <label class="sr-only" for="damla-searchbox">Arama</label>
            <input name="q" type="text" class="form-control" id="damla-searchbox" autocomplete="off" value="${param['q']}">
          </div>
          <button type="submit" class="btn btn-default">
            <span class="glyphicon glyphicon-search"></span>
            Ara
          </button>
        </form>
      </div>
    </div>
  </body>
</html>