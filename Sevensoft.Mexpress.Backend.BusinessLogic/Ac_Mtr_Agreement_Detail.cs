using System;
using System.Threading.Tasks;
using Sevensoft.Mexpress.Backend.Common;
using Sevensoft.Mexpress.Backend.DataAccess;
using Sevensoft.Mexpress.Utilities.Extender;
using static Sevensoft.Mexpress.Backend.Common.Enum;

namespace Sevensoft.Mexpress.Backend.BusinessLogic
{
    public class Ac_Mtr_Agreement_Detail : IBusinessLogic
    {
        #region Region [Methods]
        /// <summary>
        /// Nombre: DoWork
        /// Descripcion: Metodo encargado de orquestar las solicitudes de operaciones para el objeto "Do_Cat_Employee".
        /// Fecha de creación: 22/03/2019.
        /// Autor: Gustavo ZC.
        /// </summary>
        /// <param name="message"></param>
        /// <returns></returns>
        public async Task<Message> DoWork(Message message)
        {
            try
            {
                switch (message.Operation)
                {
                    case Operation.List:
                        return await List(message);
                    case Operation.ListInventory:
                        return await ListInventory(message);
                    case Operation.Get:
                        return await Get(message);
                    case Operation.Save:
                        return await Save(message);
                    case Operation.Delete:
                        return await Delete(message);
                    default:
                        var resultMessage = new Message();
                        resultMessage.Status = Status.Failed;
                        resultMessage.Result = "Operación no soportada";
                        resultMessage.MessageInfo = string.Empty;
                        return resultMessage;
                }
            }
            catch (Exception ex)
            {
                var resultMessage = new Message();
                resultMessage.Status = Status.Failed;
                resultMessage.Result = string.Format("{0}", ex.Message);
                resultMessage.MessageInfo = string.Empty;
                return resultMessage;
            }
        }
        public async virtual Task<Message> List(Message message)
        {
            try
            {
                var resultMessage = new Message();
                var model = message.DeSerializeObject<Sevensoft.Mexpress.Backend.Common.Ac_Mtr_Agreement_Detail>();
                using (var repository = new Do_Mtr_Agreement_Repository(message.Connection))
                {
                    var returnObject = await repository.List(model);
                    resultMessage.Status = Status.Success;
                    resultMessage.Result = "Proceso efectuado satisfactoriamente...";
                    resultMessage.MessageInfo = returnObject.SerializeObject();
                    return resultMessage;
                }
            }
            catch (Exception ex)
            {
                var resultMessage = new Message();
                resultMessage.Status = Status.Failed;
                resultMessage.Result = string.Format("{0}", ex.Message);
                resultMessage.MessageInfo = string.Empty;
                return resultMessage;
            }
        }

        public async virtual Task<Message> ListInventory(Message message)
        {
            try
            {
                var resultMessage = new Message();
                var model = message.DeSerializeObject<Sevensoft.Mexpress.Backend.Common.Ac_Mtr_Agreement_Detail>();
                using (var repository = new Do_Mtr_Agreement_Repository(message.Connection))
                {
                    var returnObject = await repository.ListInventory(model);
                    resultMessage.Status = Status.Success;
                    resultMessage.Result = "Proceso efectuado satisfactoriamente...";
                    resultMessage.MessageInfo = returnObject.SerializeObject();
                    return resultMessage;
                }
            }
            catch (Exception ex)
            {
                var resultMessage = new Message();
                resultMessage.Status = Status.Failed;
                resultMessage.Result = string.Format("{0}", ex.Message);
                resultMessage.MessageInfo = string.Empty;
                return resultMessage;
            }
        }
        public async virtual Task<Message> Get(Message message)
        {
            try
            {
                var resultMessage = new Message();
                var model = message.DeSerializeObject<Sevensoft.Mexpress.Backend.Common.Ac_Mtr_Agreement_Detail>();
                using (var repository = new Do_Mtr_Agreement_Repository(message.Connection))
                {
                    var returnObject = await repository.Get(model);
                    resultMessage.Status = Status.Success;
                    resultMessage.Result = "Proceso efectuado satisfactoriamente...";
                    resultMessage.MessageInfo = returnObject.SerializeObject();
                    return resultMessage;
                }
            }
            catch (Exception ex)
            {
                var resultMessage = new Message();
                resultMessage.Status = Status.Failed;
                resultMessage.Result = string.Format("{0}", ex.Message);
                resultMessage.MessageInfo = string.Empty;
                return resultMessage;
            }
        }
        public async virtual Task<Message> Save(Message message)
        {
            try
            {
                var resultMessage = new Message();
                var model = message.DeSerializeObject<Sevensoft.Mexpress.Backend.Common.Ac_Mtr_Agreement_Detail>();
                using (var repository = new Do_Mtr_Agreement_Repository(message.Connection))
                {

                    var returObject = await repository.SaveScalar(model);
                    resultMessage.Status = Status.Success;
                    resultMessage.Result = "Proceso efectuado satisfactoriamente...";
                    resultMessage.MessageInfo = returObject.SerializeObject();
                    return resultMessage;
                }
            }
            catch (Exception ex)
            {
                var resultMessage = new Message();
                resultMessage.Status = Status.Failed;
                resultMessage.Result = string.Format("{0}", ex.Message);
                resultMessage.MessageInfo = string.Empty;
                return resultMessage;
            }
        }
        public async virtual Task<Message> Delete(Message message)
        {
            try
            {
                var resultMessage = new Message();
                var model = message.DeSerializeObject<Sevensoft.Mexpress.Backend.Common.Ac_Mtr_Agreement_Detail>();
                using (var repository = new Do_Mtr_Agreement_Repository(message.Connection))
                {
                    var returnObject = await repository.DeleteScalar(model);
                    resultMessage.Status = Status.Success;
                    resultMessage.Result = "Proceso efectuado satisfactoriamente...";
                    resultMessage.MessageInfo = returnObject.SerializeObject();
                    return resultMessage;
                }
            }
            catch (Exception ex)
            {
                var resultMessage = new Message();
                resultMessage.Status = Status.Failed;
                resultMessage.Result = string.Format("{0}", ex.Message);
                resultMessage.MessageInfo = string.Empty;
                return resultMessage;
            }
        }
        #endregion
        #region Region [Dispose]
        public void Dispose()
        {
            this.Dispose(true);
            GC.SuppressFinalize(this);
        }
        protected virtual void Dispose(bool disposing)
        {
        }
        ~Ac_Mtr_Agreement_Detail()
        {
            this.Dispose(false);
        }
        #endregion
    }


}