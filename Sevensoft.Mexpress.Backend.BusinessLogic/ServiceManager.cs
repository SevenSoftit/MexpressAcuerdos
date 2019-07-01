using System;
using System.Linq;
using System.Reflection;
using System.Runtime.Loader;
using System.Threading.Tasks;
using Microsoft.Extensions.DependencyModel;
using Sevensoft.Mexpress.Backend.Common;


namespace Sevensoft.Mexpress.Backend.BusinessLogic
{
        public class ServiceManager : IDisposable
    { 
        #region Region [Variables]
        private bool disposed;
        IBusinessLogic businesslogic;

        public ServiceManager()
        {
        }
        #endregion

        #region Region [Metodos]
        public async Task<Message> DoWork(Message message)
        {
            try
            {
                var nameSpace = Assembly.GetExecutingAssembly().GetName().Name;
                var CadenaObjeto = string.Format("{0}.{1}", nameSpace, message.BusinessLogic);
                var asm = AssemblyLoadContext.Default.LoadFromAssemblyPath( Assembly.GetExecutingAssembly().Location);
                var type = asm.GetType(CadenaObjeto);
                dynamic obj = Activator.CreateInstance(type);

                return await obj.DoWork(message);
            }
            catch (Exception ex)
            {
                return new Message(new Exception(string.Format("Mensaje del sistema: {0}", ex.Message)));
            }
        }

        public class AssemblyLoader : AssemblyLoadContext
        {
            // Not exactly sure about this
            protected override Assembly Load(AssemblyName assemblyName)
            {
                var deps = DependencyContext.Default;
                var res = deps.CompileLibraries.Where(d => d.Name.Contains(assemblyName.Name)).ToList();
                
                var assembly = Assembly.Load(new AssemblyName(res.First().Name));
                return assembly;
            }
        }     

        #endregion

         #region IDisposable Support
        private bool disposedValue = false; // To detect redundant calls

        protected virtual void Dispose(bool disposing)
        {
            if (!disposedValue)
            {
                if (disposing)
                {
                    // TODO: dispose managed state (managed objects).
                }

                // TODO: free unmanaged resources (unmanaged objects) and override a finalizer below.
                // TODO: set large fields to null.

                disposedValue = true;
            }
        }

        // TODO: override a finalizer only if Dispose(bool disposing) above has code to free unmanaged resources.
        // ~ServiceManager()
        // {
        //   // Do not change this code. Put cleanup code in Dispose(bool disposing) above.
        //   Dispose(false);
        // }

        // This code added to correctly implement the disposable pattern.
        void IDisposable.Dispose()
        {
            // Do not change this code. Put cleanup code in Dispose(bool disposing) above.
            Dispose(true);
            // TODO: uncomment the following line if the finalizer is overridden above.
            // GC.SuppressFinalize(this);
        }
        #endregion

       
    }
}
