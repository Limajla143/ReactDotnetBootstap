using Microsoft.EntityFrameworkCore;

namespace API.Helpers
{
    public static class HttpContextExtensions
    {
        public static async Task InsertParametersPaginationInHeader<T>(this HttpContext httpContext, IQueryable<T> queryable)
        {
            if (httpContext == null) { throw new ArgumentNullException(nameof(HttpContext)); }

            double count = await queryable.CountAsync();

            httpContext.Response.Headers.Add("totalAmountOfRecords", count.ToString());
        }
    }
}
