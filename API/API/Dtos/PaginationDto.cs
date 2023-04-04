namespace API.Dtos
{
    public class PaginationDto
    {
        public int Page { get; set; } = 1;
        public readonly int maxRecordsPerPage = 50;

        private int recordsPerPage = 50;

        public int RecordsPerPage 
        {
            get { return recordsPerPage;  }
            set { recordsPerPage = (value > maxRecordsPerPage) ? maxRecordsPerPage : value;  }
        }

        public string? Name { get; set; }
    }
}
