using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using System.Threading.Tasks;

namespace AspnetCoreStarter.CustomMiddlewares
{
  // You may need to install the Microsoft.AspNetCore.Http.Abstractions package into your project
  public class SetDomainMiddleware
  {
    private readonly RequestDelegate _next;

    public SetDomainMiddleware(RequestDelegate next,string domain)
    {
      _next = next;
      Domain = domain;
    }

    public string Domain { get; }

    public Task Invoke(HttpContext context)
    {
      string domain = "dabr";
      if (!context.Request.Cookies.ContainsKey(domain))
      {
        context.Response.Cookies.Append(domain, Domain );
      }

      return _next(context);
    }
  }

  // Extension method used to add the middleware to the HTTP request pipeline.
  public static class SetDomainMiddlewareExtensions
  {
    public static IApplicationBuilder UseSetDomainMiddleware(this IApplicationBuilder builder,string domain)
    {
      return builder.UseMiddleware<SetDomainMiddleware>(domain);
    }
  }
}
