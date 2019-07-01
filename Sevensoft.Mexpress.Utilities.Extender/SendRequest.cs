using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;
using AspNetCore.Http.Extensions;

namespace SevenSoft.Mexpress.Utilities.Extender
{
  public class SendRequest //para enviar peticiones a la aplicacion de seguridad 7SS0
    {

        public static string InvokePost<T>(string url, string method, T entityParameter)
        {

            HttpClient client = new HttpClient();
            client.BaseAddress = new Uri(url);
            client.DefaultRequestHeaders.Accept.Clear();
            client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

            HttpResponseMessage response = client.PostAsJsonAsync(method, entityParameter).Result;

            if (response.IsSuccessStatusCode)
            {
                var jsonResult = response.Content.ReadAsStringAsync().Result;
                return jsonResult;
            }
            else
                throw new Exception(response.ReasonPhrase);
        }

    }
}
