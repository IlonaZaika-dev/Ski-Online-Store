using System;
using System.Linq.Expressions;
using Core.Entities;

namespace Core.Specifications
{
    public class ProductsWithTypesAndBrandsSpecification : BaseSpecification<Product>
    {
        public ProductsWithTypesAndBrandsSpecification(ProductSpecParams productParams)
            : base(x =>
                (string.IsNullOrEmpty(productParams.Search) || x.Name.ToLower().Contains(productParams.Search)) &&
                (!productParams.BrandId.HasValue || x.ProductBrandId == productParams.BrandId) && 
                (!productParams.TypeId.HasValue || x.ProductTypeId == productParams.TypeId))
        {
            AddInclude(p => p.ProductType);
            AddInclude(p => p.ProductBrand);
            ApplyOrderBy(p => p.Name);
            ApplyPaging(productParams.PageSize * (productParams.PageIndex - 1), productParams.PageSize);

            switch (productParams.Sort)
            {
                case "priceAsc":
                    ApplyOrderBy(p => p.Price);
                    break;
                case "priceDesc":
                    ApplyOrderByDesc(p => p.Price);
                    break;
                default:
                    ApplyOrderBy(p => p.Name);
                    break;
            }
        }

        public ProductsWithTypesAndBrandsSpecification(int id) 
            : base(p => p.Id == id)
        {
            AddInclude(p => p.ProductType);
            AddInclude(p => p.ProductBrand);
        }
    }
}