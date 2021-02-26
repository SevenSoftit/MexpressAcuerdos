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
        /// Descripcion: Metodo encargado de orquestar las solicitudes de operaciones para el objeto "Ac_Mtr_Agreement_Document".
        /// Fecha de creación: 24/07/2019.
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
                var model = message.DeSerializeObject<Mexpress.Backend.Common.Ac_Mtr_Agreement_Document>();
                using (var repository = new Gbl_Mtr_Evidence_Repository(message.Connection))
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
        public async virtual Task<Message> Get(Message message)
        {
            try
            {
                var resultMessage = new Message();
                var model = message.DeSerializeObject<Mexpress.Backend.Common.Ac_Mtr_Agreement_Document>();
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
                var model = message.DeSerializeObject<Mexpress.Backend.Common.Import_Product>();

                using (var repository = new Gbl_Mtr_Evidence_Repository(message.Connection))
                {
                    if (model.list_Agreement_Document.Count == 0 || model.list_Agreement_Document == null)
                    {
                        await repository.SaveSpecial(model);
                    }
                    else
                    {
                        foreach (var item in model.list_Agreement_Document)
                        {
                            var document = new Mexpress.Backend.Common.Ac_Mtr_Agreement_Document
                            {

                                Pk_Cat_Document_Agreement = item.Pk_Cat_Document_Agreement, 
                                Pk_Ac_Trade_Agreement = item.Pk_Ac_Trade_Agreement,                              
                                Creation_User = item.Creation_User,                             
                                Modification_User = item.Modification_User, 
                                Url_Attachment = item.Url_Attachment, 
                                Archive_Original_Name = item.Archive_Original_Name,
                                Archive_New_Name = item.Archive_New_Name,
                                File_Description = item.File_Description,
                                Name_Agreement = item.Name_Agreement, 
                                Active = item.Active,
                                Is_Invoice = item.Is_Invoice
                        };

                        await repository.Save(document);
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
        var model = message.DeSerializeObject<Mexpress.Backend.Common.Ac_Mtr_Agreement_Document>();
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
        var model = message.DeSerializeObject<Mexpress.Backend.Common.Ac_Mtr_Agreement_Document>();
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
