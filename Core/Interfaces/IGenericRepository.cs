using System.Collections.Generic;
using System.Threading.Tasks;
using Core.Entities;
using Core.Specifications;

namespace Core.Interfaces
{
    public interface IGenericRepository<T> where T : BaseEntity
    {
        Task<IReadOnlyList<T>> GetAsync();
        Task<T> GetByIdAsync(int id);
        Task<T> GetEntityBySpec(ISpecification<T> spec);
        Task<IReadOnlyList<T>> GetListAsync(ISpecification<T> spec);
    }
}