using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;
using System.Web;

namespace Sevensoft.Mexpress.Utilities.Extender
{
    public static class ObjectToQueryStringExtension
    {
        private const string FormatNameValueParameterQueryString = "{0}={1}";
        private const string SeparatorForQueryStringParameters = "&";

        public static string SerializeToQueryString<TToSerialize>(this TToSerialize source)
        {
            var properties = from property in source.GetType().GetProperties()
                             where property.GetValue(source, null) != null
                             select string.Format(FormatNameValueParameterQueryString, GetAdvancedPropertyName(property),
                             HttpUtility.UrlEncode(GetPropertyValueToSerialize(source, property)));

            // queryString will be set to "Id=1&State=26&Prefix=f&Index=oo"                  
            string queryString = String.Join(SeparatorForQueryStringParameters, properties.ToArray());

            return queryString;
        }

        public static string GetAdvancedPropertyName(PropertyInfo property)
        {
            var attributes = property.GetCustomAttributes(typeof(JsonPropertyAttribute), true);
            var propertyName = property.Name;

            if (attributes != null && attributes.Any())
            {
                var jsonProperty = (JsonPropertyAttribute)attributes.First();
                propertyName = jsonProperty.PropertyName;
            }

            return propertyName;
        }

        public static string GetAsQueryString(this NameValueCollection parameters)
        {
            if (parameters == null && parameters.Count == 0)
            {
                return string.Empty;
            }

            return string.Join("&", parameters.AllKeys.Select(key => string.Format("{0}={1}", HttpUtility.UrlEncode(key), HttpUtility.UrlEncode(parameters[key]))));
        }

        public static string GetPropertyValueToSerialize<TToSerialize>(TToSerialize source, PropertyInfo p)
        {
            var propertyValueString = string.Empty;
            var propertyValue = p.GetValue(source, null);

            if (propertyValue == null)
            {
                return propertyValueString;
            }

            if (p.PropertyType == typeof(DateTime?) || p.PropertyType == typeof(DateTime))
            {
                propertyValueString = ((DateTime)propertyValue).ToString("yyyy-MM-dd HH:mm:ss");
            }
            else
            {
                propertyValueString = p.GetValue(source, null).ToString();
            }

            return propertyValueString;
        }
    }
}
