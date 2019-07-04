using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Sevensoft.Mexpress.Backend.Common;
using static Sevensoft.Mexpress.Backend.Common.Enum;
using Sevensoft.Mexpress.Utilities.Extender;
using Sevensoft.Mexpress.Backend.DataAccess;

namespace Sevensoft.Mexpress.Backend.BusinessLogic
{
    public class Gbl_Mtr_Evidence : IBusinessLogic
    {
        #region Region [Methods]
        /// <summary>
        /// Nombre: DoWork
        /// Descripcion: Metodo encargado de orquestar las solicitudes de operaciones para el objeto "Do_Mtr_Evidence".
        /// Fecha de creación: 26/04/2019.
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
                    case Operation.Get:
                        return await Get(message);
                    case Operation.Save:
                        return await Save(message);
                    case Operation.Delete:
                        return await Delete(message);
                    case Operation.DeleteSpecific:
                        return await DeleteSpecific(message);
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
                var model = message.DeSerializeObject<Mexpress.Backend.Common.Do_Mtr_Evidence>();
                using (var repository = new Gbl_Mtr_Evidence_Repository(message.Connection))
                {
                    var returnObject = await repository.ListSpecial(model);
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
                var model = message.DeSerializeObject<Mexpress.Backend.Common.Do_Mtr_Evidence>();
                using (var repository = new Gbl_Mtr_Evidence_Repository(message.Connection))
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
                var model = message.DeSerializeObject<Mexpress.Backend.Common.Do_Mtr_Evidence>();

                using (var repository = new Gbl_Mtr_Evidence_Repository(message.Connection))
                {
                    if (model.list_Evidence_Archive.Count == 0 || model.list_Evidence_Archive == null)
                    {
                        await repository.Save(model);
                    }
                    else
                    {
                        foreach (var item in model.list_Evidence_Archive)
                        {

                            var archive = new Mexpress.Backend.Common.Do_Mtr_Evidence
                            {

                                Pk_Mtr_Pay_Evidence_Process = item.Pk_Mtr_Pay_Evidence_Process,
                                Pk_Do_Mtr_Pay_Slip = item.Pk_Do_Mtr_Pay_Slip,
                                Pk_Do_Cat_Group = item.Pk_Do_Cat_Group,
                                Creation_User = item.Creation_User,
                                Modification_User = item.Modification_User,
                                Archive_Original_Name = item.Archive_Original_Name,
                                Archive_New_Name = item.Archive_New_Name,
                                Url_Attachment = item.Url_Attachment,
                                Active = item.Active,
                                Slip_Name = item.Slip_Name
                            };

                            await repository.Save(archive);
                        }
                    }
                }

                resultMessage.Status = Status.Success;
                resultMessage.Result = "Proceso efectuado satisfactoriamente...";
                resultMessage.MessageInfo = String.Empty;
                return resultMessage;
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
                var model = message.DeSerializeObject<Mexpress.Backend.Common.Do_Mtr_Evidence>();
                using (var repository = new Gbl_Mtr_Evidence_Repository(message.Connection))
                {
                    await repository.DeleteSpecial(model);
                    resultMessage.Status = Status.Success;
                    resultMessage.Result = "Proceso efectuado satisfactoriamente...";
                    resultMessage.MessageInfo = String.Empty;
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

        public async virtual Task<Message> DeleteSpecific(Message message)
        {
            try
            {
                var resultMessage = new Message();
                var model = message.DeSerializeObject<Mexpress.Backend.Common.Do_Mtr_Evidence>();
                using (var repository = new Gbl_Mtr_Evidence_Repository(message.Connection))
                {
                    await repository.DeleteSpecific(model);
                    resultMessage.Status = Status.Success;
                    resultMessage.Result = "Proceso efectuado satisfactoriamente...";
                    resultMessage.MessageInfo = String.Empty;
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
        ~Gbl_Mtr_Evidence()
        {
            this.Dispose(false);
        }
        #endregion
    }
}
