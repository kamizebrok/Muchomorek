using System.ComponentModel.DataAnnotations;

namespace MuchomorekBack.DTO
{
    public class DTOHarvest
    {
        public string Name { get; set; }
        public string Type { get; set; }
        public int Count { get; set; }
        public float Latitude { get; set; }
        public float Longitude { get; set; }
        public DTOHarvest() { }
        public DTOHarvest(string name, string type, int count, float latitude, float longitude)
        {
            this.Name = name;
            this.Type = type;
            this.Count = count;
            this.Latitude = latitude;
            this.Longitude = longitude;
        }
    }
}
