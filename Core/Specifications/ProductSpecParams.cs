namespace Core.Specifications
{
    public class ProductSpecParams
    {
        private const int MaxPageSize = 50;
        public ProductSpecParams()
        {
            PageIndex = 1;
            _pageSize = 10;
        }
        private int _pageSize;
        public int PageSize
        {
            get => _pageSize; 
            set => _pageSize = value > MaxPageSize ? MaxPageSize : value;
        }
        public int PageIndex { get; set; }
        public int? BrandId { get; set; }
        public int? TypeId { get; set; }
        public string Sort { get; set; }
        private string _search;
        public string Search
        {
            get => _search;
            set => _search = value.ToLower();
        }
        
    }
}