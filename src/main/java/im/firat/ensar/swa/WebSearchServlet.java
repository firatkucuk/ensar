
package im.firat.ensar.swa;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;



public class WebSearchServlet extends HttpServlet {



    //~ --- [CONSTRUCTORS] ---------------------------------------------------------------------------------------------

    public WebSearchServlet() {

    }



    //~ --- [METHODS] --------------------------------------------------------------------------------------------------

    @Override
    protected void doGet(final HttpServletRequest request, final HttpServletResponse response) throws ServletException,
        IOException {

        response.setContentType("text/html;charset=UTF-8");

        String query = request.getParameter("q");
        String view  = "/WEB-INF/views/websearch.jsp";

        if (query == null || query.isEmpty()) {
            view = "/WEB-INF/views/webhome.jsp";
        }

        request.getRequestDispatcher(view).forward(request, response);
    }
}
