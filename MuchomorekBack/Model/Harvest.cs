using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MuchomorekBack.Model
{
    [Table("harvest")]
    public class Harvest
    {
        [Key] public int ID { get; set; }
        public string Name { get; set; }
        public string Type { get; set; }
        public int Count { get; set; }
        public DateTime Date { get; set; }
        public float Latitude { get; set; }
        public float Longitude { get; set; }
        public Harvest() { }
        public Harvest(string imie, string rodzaj, int ile, DateTime data, float szer_geo, float dlu_geo)
        {
            this.Name = imie;
            this.Type = rodzaj;
            this.Count = ile;
            this.Date = data;
            this.Latitude = szer_geo;
            this.Longitude = dlu_geo;
        }
    }
}
