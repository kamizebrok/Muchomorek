namespace MuchomorekBack.DTO
{
    public class DTOHarvestListElement
    {
        public float Latitude { get; set; }
        public float Longitude { get; set; }
        public int Amount { get; set; }
        public string Type { get; set; }
        public DTOHarvestListElement() { }
        public DTOHarvestListElement(string rodzaj, int ile, float szer_geo, float dlu_geo)
        {
            this.Type = rodzaj;
            this.Amount = ile;
            this.Latitude = szer_geo;
            this.Longitude = dlu_geo;
        }
    }
}
