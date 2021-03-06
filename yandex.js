/**
 * Создает экземпляр Машины
 * @this {Car}
 * @param {string} manufacturer Производитель
 * @param {string} model Модель
 * @param {number} year Год производство
 */
function Car(manufacturer, model, year) {
    this.manufacturer	 = manufacturer;
    this.model			 = model;
    this.year			 = year || (new Date).getFullYear();
    this.price			 = '0';
}

/**
 * Возвращает информацию о машине
 * 
 * @return {String}
 */
Car.prototype.getInfo = function()
{
	return this.manufacturer + ' ' + this.model + ' ' + this.year;
}

/**
 * Переопределили метод привидение к типу String
 * 
 * @return {String}
 */
Car.prototype.toString = Car.prototype.getInfo;

/**
 * Возвращает детализированную информацию о машине
 * 
 * @return {String}
 */
Car.prototype.getDetailedInfo = function()
{
	return 'Производитель: ' + this.manufacturer + '. Модель: ' + this.model + '. Год: ' + this.year;
}

/**
 * Возвращает страну производителя машины
 * 
 * @return {String}
 */
Car.prototype.getCountry = function(){
    switch (this.manufacturer.toLowerCase()) {
    	case 'bmw':
		case 'audi':
            return 'Germany';
		case 'toyota':
            return 'Japan';
	}
}


/**
 * Создает экземпляр Автосалона
 * @this {CarDealer}
 * @param {String} name Название автосалона
 */
function CarDealer(name) {
    this.name = name;
    this.cars = [];
}

/**
 * Добавляет машину в автосалон
 * 
 * @return {CarDealer}
 */
CarDealer.prototype.add = function()
{
	for(var i=0, len=arguments.length; i<len; i++)
		this.cars.push(arguments[i]);
		
	return this;
}

/**
 * Установить цену на машину
 * @param {string} car идентификатор машины
 * @param {string} price стоимость
 * 
 * @return {CarDealer}
 */
CarDealer.prototype.setPrice = function(car, price)
{
	var carProps = car.split(' ');
	for(var i=0, len = this.cars.length; i<len; i++)
		if((this.cars[i].manufacturer == carProps[0])
			&&(this.cars[i].model == carProps[1])
			&&(this.cars[i].year == carProps[2])
		)
		{
			this.cars[i].price = price;
			return this;
		} 
	
	return this;
}

/**
 * Возвращает список машин
 * @param {String} Страна производитель машины. Необязательный параметр 
 * 
 * @return {String}
 */
CarDealer.prototype.list = function()
{
	var str = "";
	for(var i=0, len = this.cars.length; i<len-1; i++)
	{
		if(arguments.length > 0)
		{
			if(this.cars[i].getCountry() == arguments[0])
				str += this.cars[i] + ', ';
		}
		else
			str += this.cars[i] + ', ';
	}
	
	return str.substr(0, (str.length-2));
}

/**
 * Возвращает список машин с фильтрацией по стране-производителю
 * Метод реализован для совместимости с API. Рекомендуется использовать метод CarDealer.list
 * @param {String} country Страна производитель машины
 * 
 * @return {String}
 */
CarDealer.prototype.listByCountry = function(country) { return this.list(country); }

/**
 * Возвращает прайс-лист машин автосалона в рублях
 * 
 * @return {String}
 */
CarDealer.prototype.listRusPrice = function(){
	for(var i=0, len = this.cars.length; i<len-1; i++)
		str += this.cars[i] + ' ' + ((this.cars[i].price[0] == '€') ? this.cars[i].price.substr(1)*40 : this.cars[i].price.substr(1)*0.4) + ', ';
	return str.substr(0, (str.length-2));
}

var bmw		 = new Car("BMW", "X5", 2010),
    audi	 = new Car("Audi", "Q5", 2012),
    toyota	 = new Car("Toyota", "Camry");

var yandex = new CarDealer('Яндекс.Авто');

yandex
    .add(toyota)
    .add(bmw, audi);

yandex
    .setPrice('BMW X5 2010', '€2000')
    .setPrice('Audi Q5 2012', '€3000')
    .setPrice('Toyota Camry 2012', '¥3000');

yandex.list();
yandex.listByCountry('Germany');
yandex.listRusPrice();
