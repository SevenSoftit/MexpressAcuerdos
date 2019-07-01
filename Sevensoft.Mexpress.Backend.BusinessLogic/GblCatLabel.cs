using System;
using System.Threading.Tasks;
using Sevensoft.Mexpress.Backend.Common;
using Sevensoft.Mexpress.Backend.DataAccess;
using Sevensoft.Mexpress.Utilities.Extender;
using static Sevensoft.Mexpress.Backend.Common.Enum;

namespace Sevensoft.Mexpress.Backend.BusinessLogic
{
    public class GblCatLabel : IBusinessLogic
    {
        #region Region [Methods]
        /// <summary>
        /// Nombre: DoWork
        /// Descripcion:Method in charge of orchestrating the operations requests for the object "GBL_CAT_LABELS".
        /// Fecha de creación: 20/03/2019.
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
            * Creation date: 20/03/2019
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
                var model = message.DeSerializeObject<Do_Cat_Label>();
                using (var repository = new GblCatLabelRepository(message.Connection))
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
            * Creation date: 20/03/2019
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
                var model = message.DeSerializeObject<Do_Cat_Label>();
                using (var repository = new GblCatLabelRepository(message.Connection))
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
            * Creation date: 20/03/2019
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
                var model = message.DeSerializeObject<Do_Cat_Label>();
                using (var repository = new GblCatLabelRepository(message.Connection))
                {
                    await repository.Save(model);
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

        public Task<Message> Delete(Message message)
        {
            throw new NotImplementedException();
        }

        ~GblCatLabel()
        {
            this.Dispose(false);
        }
        #endregion
    }
}