using System;
using System.Threading.Tasks;
using Sevensoft.Mexpress.Backend.Common;
using Sevensoft.Mexpress.Backend.DataAccess;
using Sevensoft.Mexpress.Utilities.Extender;
using static Sevensoft.Mexpress.Backend.Common.Enum;

namespace Sevensoft.Mexpress.Backend.BusinessLogic
{
    public class Gbl_Wrk_Agreement_Detail : IBusinessLogic
    {
        #region Region [Methods]
        /// <summary>
        /// Nombre: DoWork
        /// Descripcion: .
        /// Fecha de creación: 05/07/2019.
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

        /**************************************************************
            * Author: Gustavo ZC
            * Creation date: 05/07/2019
            * Description: Method responsible for communicating with the DataAccess and for extracting information
            * Modifications:
            * ************************************************************
            * Number:
            * Date:
            * Ticket:
            * Author:
            * Descripction:
            * ************************************************************
        */

        public async virtual Task<Message> List(Message message)
        {
            try
            {
                var resultMessage = new Message();
                var model = message.DeSerializeObject<Import_Product>();
                using (var repository = new Gbl_Wrk_Agreement_Detail_Repository(message.Connection))
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

        /**************************************************************
            * Author: Gustavo ZC
            * Creation date: 05/07/2019
            * Description: Method responsible for communicating with the DataAccess and for extracting information
            * Modifications:
            * ************************************************************
            * Number:
            * Date:
            * Ticket:
            * Author:
            * Descripction:
            * ************************************************************
        */

        public async virtual Task<Message> Get(Message message)
        {
            try
            {
                var resultMessage = new Message();
                var model = message.DeSerializeObject<Import_Product>();
                using (var repository = new Gbl_Wrk_Agreement_Detail_Repository(message.Connection))
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
                resultMessage.Result = string.Format("{ 0}", ex.Message);
                resultMessage.MessageInfo = string.Empty;
                return resultMessage;
            }
        }

        /**************************************************************
            * Author: Gustavo ZC
            * Creation date: 05/07/2019
            * Description: Method responsible for communicating with the DataAccess and for save information
            * Modifications:
            * ************************************************************
            * Number:
            * Date:
            * Ticket:
            * Author:
            * Descripction:
            * ************************************************************
        */

        public async virtual Task<Message> Save(Message message)
        {
            try
            {
                var resultMessage = new Message();
                var model = message.DeSerializeObject<Import_Product>();
                using (var repository = new Gbl_Wrk_Agreement_Detail_Repository(message.Connection))
                {
                    if (model.Option == Agreement_Option.Process_Work_Table)
                    {
                        var resultDetailList = repository.ExecuteProcess(model);
                        resultMessage.MessageInfo = resultDetailList.Result.SerializeObject();;
                    }
                    else
                    {
                        if(model.Pk_Ac_Trade_Agreement != 0){
                            await repository.Delete(model);
                        }
                        var repository_funcionality = new Generic_Funcionality(message.Connection);
                        //var result = await repository.SaveGet(model);
                        // model.Pk_Ac_Trade_Agreement = result.Pk_Ac_Trade_Agreement;
                        model.Pk_Ac_Trade_Agreement = model.Pk_Ac_Trade_Agreement;
                        model.Total_Records = repository_funcionality.readAsExcelFile(model);
                        await repository.Save(model);
                        var resultProductList = repository.ListWorkTable(model);

                        resultMessage.MessageInfo = resultProductList.Result.SerializeObject();
                    }


                    resultMessage.Status = Status.Success;
                    resultMessage.Result = "Proceso efectuado satisfactoriamente...";
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

        /**************************************************************
           * Author: Gustavo ZC
           * Creation date: 05/07/2019
           * Description: Method responsible for communicating with the DataAccess and for delete information
           * Modifications:
           * ************************************************************
           * Number:
           * Date:
           * Ticket:
           * Author:
           * Descripction:
           * ************************************************************
       */

        public async virtual Task<Message> Delete(Message message)
        {
            try
            {
                var resultMessage = new Message();
                var model = message.DeSerializeObject<Import_Product>();
                using (var repository = new Gbl_Wrk_Agreement_Detail_Repository(message.Connection))
                {
                    await repository.Delete(model);
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
        ~Gbl_Wrk_Agreement_Detail()
        {
            this.Dispose(false);
        }
        #endregion

    }
}