
// 상품의 결제 금액을 계산하는 코드로 시작해보자.

// function priceOrder (product, quantity, shippingMethod) { const basePrice = product.basePrice * quantity; const discount = Math.max(quantity - product.discountThreshold, 0) * product.basePrice * product.discountRate; const shippingPerCase = (basePrice > shippingMethod.discountThreshold) ? shippingMethod.discountedFee : shippingMethod. feePerCase; const shippingCost = quantity * shippingPerCase; const price = basePrice - discount + shippingCost; return price; }

// 간단한 예지만, 가만 보면 계산이 두 단계로 이뤄짐을 알 수 있다. 앞의 몇 줄은 상품 정보를 이용해서 결제 금액 중 상품 가격을 계산한다. 반면 뒤의 코드는 배송 정보를 이용하여 결제 금액중 배송비를 계산한다. 나중에 상품 가격과 배송비 계산을 더 복잡하게 만드는 변경이 생긴다.면 (비교적 서로 독립적으로 처리할 수 있으므로) 이 코드는 두 단계로 나누는 것이 좋다.

// ① 먼저 배송비 계산 부분을 함수로 추출전한다.

// = function priceOrder(product, quantity, shippingMethod) { const basePrice = product.basePrice * quantity; const discount = Math.max(quantity - product.discountThreshold, 0) * product.basePrice * product.discountRate; const price = applyShipping(basePrice, shippingMethod, quantity, discount); return price; }

// 두 번째 단계를 처리하는 함수 function applyShipping(basePrice, shippingMethod, quantity, discount) { const shippingPerCase = (basePrice > shippingMethod.discountThreshold) ? shippingMethod.discountedFee : shippingMethod.feePerCase; const shippingCost = quantity * shippingPerCase; const price = basePrice - discount + shippingCost; return price; }

// 두 번째 단계에 필요한 데이터를 모두 개별 매개변수로 전달했다. 실전에서는 이런 데이터가상당히 많을 수 있는데, 어차피 나중에 걸러내기 때문에 걱정할 필요 없다.

// 리팩터링(2판)

// 216


// ③ 다음으로 첫 번째 단계와 두 번째 단계가 주고받을 중간 데이터 구조를 만든다.

// function priceOrder (product, quantity, shipping Method) {

// const basePrice = product.basePrice * quantity; const discount = Math.max(quantity - product.discountThreshold, 6)

// * product.basePrice * product.discountRate; const priceData = {}; - 중간 데이터 구조 const price = applyShipping(priceData, basePrice, shippingMethod, quantity, discount);

// return price; }

// function applyShipping(priceData, basePrice, shippingMethod, quantity, discount) { const shippingPerCase = (basePrice > shippingMethod.discountThreshold)

// ? shippingMethod.discountedFee : shippingMethod.feePerCase; const shippingCost = quantity shippingPerCase; const price = basePrice - discount + shippingCost;

// return price; }

// ⑤ 이제 applyShipping()에 전달되는 다양한 매개변수를 살펴보자. 이중 basePrice는 첫 번째 단계를 수행하는 코드에서 생성된다. 따라서 중간 데이터 구조로 옮기고 매개변수 목록에서 제거한다.

// function priceOrder (product, quantity, shippingMethod) { const basePrice = product.basePrice * quantity; const discount = Math.max (quantity - product.discountThreshold, 6)

// * product.basePrice * product.discountRate; const priceData = {basePrice: basePrice); const price = applyShipping(priceData, basePrice, shippingMethod, quantity, discount);

// return price; }

// function applyShipping (priceData, basePrice, shippingMethod, quantity, discount) { const shippingPerCase = (priceData basePrice > shippingMethod. discountThreshold)

// ? shippingMethod.discountedFee : shippingMethod feePerCase; const shipping Cost = quantity * shippingPerCase; const price = priceData.basePrice - discount + shippingCost;

// return price; }

// Chapter 06 - 기본적인 리팩터링

// Split Phase| 6.11 단계 포개기

// 217


// 다음으로 shippingMethod를 보자. 이 매개변수는 첫 번째 단계에서는 사용하지 않으니 그대로 둔다.

// 그다음 나오는 quantity는 첫 번째 단계에서 사용하지만 거기서 생성된 것은 아니다. 그래서 그냥 매개변수로 놔둬도 된다. 하지만 나는 최대한 중간 데이터 구조에 담는 걸 선호하기 때문에 이 매개변수도 옮긴다.

// function priceOrder (product, quantity, shippingMethod) { const basePrice = product.basePrice + quantity; const discount = Math.max (quantity - product.discountThreshold, 0) * product.basePrice * product.discountRate; const priceData = {basePrice: basePrice, quantity: quantity}; const price = applyShipping (priceData, shippingMethod, quantity, discount); return price; }

// function applyShipping (priceData, shippingMethod, quantity, discount) { const shippingPerCase = (priceData.basePrice > shippingMethod.discountThreshold)

// ? shippingMethod.discountedFee : shippingMethod.feePerCase; const shipping Cost = priceData.quantity * shippingPerCase; const price = priceData.basePrice discount + shipping Cost; return price; }

// discount도 같은 방법으로 처리한다.

// function priceOrder (product, quantity, shippingMethod) {

// const basePrice = product.basePrice * quantity; const discount = Math.max (quantity - product.discountThreshold, 6)

// * product.basePrice * product.discountRate; const priceData = {basePrice: basePrice, quantity: quantity, discount:discount); const price = applyShipping(priceData, shippingMethod, discount);

// return price; }

// function applyShipping(priceData, shippingMethod, discount) { const shippingPer Case = (priceData.basePrice > shippingMethod.discountThreshold) ? shippingMethod.discountedFee : shippingMethod. feePerCase; const shippingCost = priceData.quantity shippingPerCase;

// 218 리팩터링(2판)


// const price = priceDatabasePrice - priceData.discount + shipping Cost; return price; }

// 매개변수들을 모두 처리하면 중간 데이터 구조가 완성된다. ⑥ 이제 첫 번째 단계 코드를 함수로 추출하고 이 데이터 구조를 반환하게 한다.

// -function priceOrder (product, quantity, shippingMethod) {

// const priceData = calculatePricingData(product, quantity); const price = applyShipping(priceData, shippingMethod); return price; } function calculatePricingData(product, quantity) { 첫 번째 단계를 처리하는 함수 const basePrice = product.basePrice * quantity; const discount = Math.max (quantity - product.discountThreshold, 0) * product.basePrice * product.discountRate; return {basePrice: basePrice, quantity: quantity, discount:discount}; } function applyShipping(priceData, shippingMethod) { - 두 번째 단계를 처리하는 함수 const shippingPerCase = (priceData.basePrice > shippingMethod.discountThreshold) ? shippingMethod. discountedfee shippingMethod feePerCase; const shipping Cost = priceData.quantity * shippingPer Case; const price = priceData.basePrice - priceData.discount + shippingCost; return price; } 나는 최종 결과를 담은 상수들(price)도 깔끔하게 정리해야 속이 시원하다.

// function priceOrder (product, quantity, shippingMethod) {

// const priceData = calculatePricingData(product, quantity);

// return applyShipping(priceData, shippingMethod); }

// function calculatePricingData(product, quantity) {

// const basePrice = product.basePrice * quantity; const discount = Math.max (quantity - product.discountThreshold, 0)

// * product.basePrice * product.discountRate; return {basePrice: basePrice, quantity: quantity, discount:discount);

// Chapter 06 - 기본적인 리팩터링 219

// Split Phase| 6.11 단계 쪼개기


// function applyShipping (priceData, shippingMethod) { const shippingPerCase = (priceData.basePrice > shippingMethod.discountThreshold) ? shippingMethod.discountedFee : shippingMethod feePerCase; const shipping Cost = priceData.quantity + shippingPerCase; return priceData.basePrice - priceData.discount + shippingCost; }

// }
