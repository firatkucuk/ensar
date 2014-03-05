#!/usr/bin/awk -f

function printItem(itemVolume, itemPage, itemTitle, itemContent) {

  text = "<html>" "\n";
  text = text " <head>" "\n"
  text = text "   <title>" title ", Cilt " volume ", Sayfa " page "</title>" "\n"
  text = text " </head>" "\n"
  text = text " <body>" "\n"
  text = text "   <h1>Cilt " volume " Sayfa " page "</h1>" "\n" 
  text = text content "\n"  
  text = text " </body>" "\n"

  print text >  volume "_" page "_" itemCounter++ ".html";
}

BEGIN {
  itemCounter = 0;
  volume      = 0;
  page        = 0;
  content     = "";
  title       = "";
}  

/^\|\|/ {
  volumePage = $0;

  gsub("\\|\\| ", "", volumePage);
  gsub("\.html \\|\\|", "", volumePage);

  volume = substr(volumePage, 0, 2);
  page   = substr(volumePage, 3, 6);

  if (title != "") {
    printItem(volume, page, title, content);
    #print "+++++++++++++++++++++";
    #print title "||" volume "||" page "||" content;
    content = "";
  }
}

/^<b>.*<\/b><br><br>/ {
  title = $0;

  gsub("<b>", "", title);
  gsub("<\/b>.*", "", title);

  printItem(volume, page, title, content);
  #print "-----------------------";
  #print title "||" volume "||" page "||" content;
  content = "";
}

!/^\|\|/ {
  content = content $0;
}
