using System;
using System.Threading.Tasks;
using Sevensoft.Mexpress.Backend.Common;

namespace Sevensoft.Mexpress.Backend.BusinessLogic
{

    public interface IBusinessLogic : IDisposable
    {
        Task<Message> DoWork(Message message);
        Task<Message> List(Message message);
        Task<Message> Get(Message message);
        Task<Message> Save(Message message);
        Task<Message> Delete(Message message);
    }
}

